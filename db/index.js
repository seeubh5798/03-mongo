const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Shubham:${password here}@cluster0.ckcf4.mongodb.net/Week3').then((connection)=>{
    console.log("connection established")
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    email :String,
    password :String,
    isAdmin :Boolean

});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    email :String,
    password :String,
    courses : [{
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'Course,'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}