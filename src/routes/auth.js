const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const {validateSignupData} = require('../utils/validation')

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    // console.log("req", req.body)
    // creating a new instance of the user model
    const { password, firstName, lastName, emailId, gender, about, age, } = req.body;
    try {
        //
        validateSignupData(req);

        // encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            password: passwordHash,
            emailId,
            gender,
            about,
            age
        });

        await user.save();
        res.send("User added sucessfully!");

    } catch (err) {
        console.log(err)
        res.status(400).send('ERROR: ' + err.message)

    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credential!");
        }

        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            // create a JWT token

            const token = await user.getJWT();

            // Add the token to cookie and send the response back to the user
            res.cookie('token', token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })
            res.send("Login Successfull!");
        } else {
            throw new Error(" Invalid credentials")
        }
    } catch (err) {
        res.status(400).send('ERROR' + err.message)
    }
});


module.exports = authRouter;