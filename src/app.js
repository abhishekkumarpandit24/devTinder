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
        res.status(400).send('Something went wrong!')

    }
});

// Get user by email
app.get('/user', async (req, res) => {
    const email = req.body.emailId;
try {
    const users = await User.findOne({ emailId: email });
    if(!users){
        res.status(404).send("user not found!");
    }
    // if(users.length === 0){
    //     res.status(404).send("user not found!");
    // } 
    else {
        res.send(users);
    }
}catch (err){
    res.status(400).send('Something went wrong!')
}
})

// Feed API - GET /feed - get all the users from the database
app.get('/feed', async (req, res) => {
try {
    const users = await User.find({});
    res.send(users)
}catch (err){
    res.status(400).send('Something went wrong!')
}
});

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
    //    const user = await User.findByIdAndDelete({ _id: userId })
       const user = await User.findByIdAndDelete(userId)
        res.status(200).send("user deleted successfully!");
    } catch (err){
        res.status(400).send('Something went wrong!')
    }
});

// update data of the user
app.patch('/user/:userId', async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = [
       "userId", "skills", "photoUrl", "about", "gender", "age", "emailId", "password"
    ]

    try {
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed) {
        throw new Error("Update not allowed")
    }
    if(data.skills?.length > 10){
        throw new Error("Skills should not be more than 10")
    }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true
        });
        res.send('User updated Successfully!')
    } catch (err){
        res.status(400).send('Something went wrong!'+ err.message);
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

