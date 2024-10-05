const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle auth middleware for all requests having admin
app.use("/admin", adminAuth)

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully!");
});

app.get("/user", userAuth, (req, res) => {
    res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
    // check if the request is authorised
    // Now don't need this 
    // const token = "xyz" || req.body?.token;
    // const isAdminAuthorized = token === "xyz";
    // if(isAdminAuthorized) {
    // res.send("All Data sent");
    // } else {
    //     res.status(401).send("Not authorised!")
    // }
    res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
    // check if the request is authorised
    // const token = "xyz" || req.body?.token;
    // const isAdminAuthorized = token === "xyz";
    // if(isAdminAuthorized) {
    //     res.send("Delete a user");

    // } else {
    //     res.status(401).send("Not authorised!")
    // }
    res.send("Delete a user");

});

app.listen(4000, () => {
    console.log("Server is successfully running at port 4000...")
});