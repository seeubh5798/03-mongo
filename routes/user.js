const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {email , password} = req.body;

    const check = await User.findOne({email: email});
    console.log(check)
    if(check){
        res.json({"res":"email already in use"});
        return ;
    }
    else{
    const save = await User.create({email: email, password: password});
        res.status(200).json({ success: "created user successfully", message: save});
    }


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({ course: response , length : response.length});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const email = req.headers.email;

    const response = await User.updateOne({email: email} , {
        $push: { courses: courseId}
    });


    // Need to add payment logic here before sending rwsponses 
    res.json({"success": "purchase successfully" , response: response});

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        email: req.headers.email
    });
    console.log(user)
    const response = await Course.find({
        _id : {
            $in : user.courses
        }
    })
    res.json({response})

});

module.exports = router