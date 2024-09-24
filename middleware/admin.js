const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const { email ,password} = req.headers;

   const dbres = await Admin.findOne({ email , password});
//    console.log(dbres)
   if(dbres){
    // console.log("calling next")
    next();
    return;
   }
   res.status(403).json({
    res: "Forbidden resuest, you are not administrator"
   });

}

module.exports = adminMiddleware;