const express = require("express");

const app = express();

// this will only handle GET call to /user
app.get("/user", (req, res, next) => {
    // res.send("Route handler 1")
    next();
}, (req, res) => {
    res.send("2nd response")
});

app.listen(4000, () => {
    console.log("Server is successfully running at port 4000...")
});