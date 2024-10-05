const express = require("express");

const app = express();

// this will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Abhishek", lastName: "Pandit" })
});

app.post('/user', (req, res) => {
    // saving data to DB
    res.send("Data successfully saved to the database");
});

app.delete('/user', (req, res) => {
    res.send("Deleted successfully!")
})

// this will match all thje HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("Hello from the server");
})

app.use("/", (req, res) => {
    res.send("Namaste Abhishek")
})

app.listen(4000, () => {
    console.log("Server is successfully running at port 4000...")
});