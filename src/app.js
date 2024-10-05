const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
    
    // creating a new instance of the user model
    const user = new User({
        firstName: "Abhishek",
        lastName: "Pandit",
        emailId: "pandit@gmail.com",
        password: "adfm"
    });

    await user.save();
    res.send("User added sucessfully!");
})

connectDB().then(() => {
    console.log("Database connection established...")
    app.listen(4000, () => {
        console.log("Server is successfully running at port 4000...")
    });
}).catch((err) => {
    console.log("Database cannot be connected!!")
})

