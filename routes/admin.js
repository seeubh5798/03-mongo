const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { email, password } = req.body;

  const check = await Admin.findOne({email});
  console.log(check);
  if(check){
    res.json({"Error":"email already exists"});
    return;
  }
  const response = await Admin.create({
    email,
    password,
    isAdmin: true,
  });

  res
    .status(200)
    .json({ response: response, status: "Admin created successfully" });
});

router.post("/courses", adminMiddleware,async (req, res) => {
  // Implement course creation logic

  const { title, description, imageLink, price } = req.body;
  console.log(req.body)

  try{
    const newCourse = await Course.create({ title, description, imageLink, price });
    console.log(newCourse)
    res.json({
        message: 'Course created successfully', newCourse
    })
  }
  catch(err){
    console.log(err)
  }
  
 
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const course = await Course.find({});
  console.log(course);
  res.status(200).json({ course: course , leength : course.length});
});

module.exports = router;
