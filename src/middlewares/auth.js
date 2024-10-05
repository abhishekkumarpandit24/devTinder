const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xdfyz" || req.body?.token;
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Not authorised!");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth is getting checked");
    const token = "xyz" || req.body?.token;
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Not authorised!");
    } else {
        next();
    }
}

module.exports = { adminAuth, userAuth }