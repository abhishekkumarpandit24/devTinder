const express = require("express");
const {userAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post('/sendconnectionrequest', userAuth, async(req, res) => {
    const user = req.user;
    res.send(user + 'send the connection request')
})

module.exports = requestRouter;
