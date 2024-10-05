const express = require("express");

const app = express();

app.get('/getUserData', (req, res) => {
    try {
    res.send("user Data sent");
      
    } catch (err) {
        res.status(500).send(err.message)
    }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong!");
    }
})

app.listen(4000, () => {
    console.log("Server is successfully running at port 4000...")
});