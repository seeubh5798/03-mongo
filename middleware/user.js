const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { email} = req.headers;

    const dbres = await User.findOne({ email});
    if(dbres){
     next();
     return;
    }
    res.status(403).json({
     res: "Something is wrong , pls try again"
    });
}

module.exports = userMiddleware;