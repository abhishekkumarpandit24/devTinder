const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    // console.log("req", req.body)
    // creating a new instance of the user model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added sucessfully!");

    } catch (err) {
        console.log(err)
    }
})

connectDB().then(() => {
    console.log("Database connection established...")
    app.listen(4000, () => {
        console.log("Server is successfully running at port 4000...")
    });
}).catch((err) => {
    console.log("Database cannot be connected!!")
})

