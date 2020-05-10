const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require("../models/Courses");
const Profile = require("../models/Profile");



// @router      GET api/courses/:courseID
// @desc        Get course by ID
// @access      Private

router.get('/:id', auth, 

    
    async (req, res) => {

    try {
        let id = req.params.id;
        const courses = await Course
            .findById(id)
            .populate("user", ["name"]);
            
        res.json(courses);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @route   POST api/course
// @desc    Create/update course
// @access  private

router.post("/", auth,  async (req, res) =>{
    const {company, description, skills, name, date, competencies} = req.body;
    const courseFields = {};
    
    courseFields.user = req.user.id;
    courseFields.company = company;
    courseFields.description = description;
    courseFields.name = name;
    courseFields.date = date;
    courseFields.skills = skills.split(',').map(skill => skill.trim());  
    courseFields.competencies = competencies;  

    try {   
        // create course
        let course = new Course(courseFields);
        await course.save();
        res.json(course);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// @route   GET api/courses
// @desc    Get all courses
// @access  public

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @router      GET api/courses/company/:id
// @desc        Get ALL courses in specific company
// @access      Private

router.get('/company/:id', auth, 

    async (req, res) => {

    try {
        const courses = await Course.find({company: req.params.id});
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @router      POST api/courses/assign/:userID
// @desc        Assign a course to a user profile
// @access      Private

router.post('/assign/:userID', auth,  

    async (req, res) => {

    try {
        const courses = await Course.find({  // Get all the courses
                _id: {
                    $in: req.body.courseIDs
                }
            }
        ).select("name description competencies"); 
        

        await Profile.update({user: req.params.userID},
            {"$push": {"currentCourses": courses}});

        res.json({courses: courses});
    } catch (err) {
        
        res.status(500).send('Server error');
    }
});


// @router  POST api/courses/take/:courseID
// @desc    The course gets sent to the logged in user
// @acces   private

router.post('/take/:courseID', auth,  

    async (req, res) => {

    try {
        const course = await Course.find({  // Get all the courses
                _id: 
                    req.params.courseID
                }
        ).select("name description competencies"); 
        

        const response = await Profile.update({user: req.user.id},
            {"$push": {"currentCourses": course}});

        res.json(response);
    } catch (err) {
        
        res.status(500).send('Server error');
    }
});

module.exports = router;