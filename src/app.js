const express = require("express");

const app = express();

// GET /users => it checks all the app.xxx('matching route") functions

app.use("/", (req, res, next) => {
    next();
})

// this will only handle GET call to /user
app.get("/user", (req, res, next) => {
    // res.send("Route handler 1")
    next();
}, (req, res, next) => {
    // res.send("2nd response")
    next();
}, (req, res, next) => {
    res.send("3rd route handler")
});

app.listen(4000, () => {
    console.log("Server is successfully running at port 4000...")
});