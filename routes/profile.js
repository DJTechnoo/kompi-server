const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require("../models/Profile");
const mongoose = require('mongoose'); // for ObjectId 



// @route   GET api/profile/completecourse/:id
// @desc    Complete a course and achieve competencies.
// @access  private

router.put("/completecourse/:id", auth, async (req, res) => {
    try {
        const courses = await Profile.aggregate([
            {
                "$match": {
                    "user": mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                "$unwind": "$currentCourses"
            },
            {
                "$match": {
                    "currentCourses._id": mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $project: {
                    currentCourses: 1
                  
                }
            }

            
        ])

        if(courses.length < 1) return res.status(400).json({msg: "Courses not found"});
        let course = courses[0].currentCourses;

        const competencies = await Profile.findOne({user: req.user.id}).select("competencies");
        if(!competencies) return res.status(400).json({msg: "Competencies not found"});

        // profile has no skills / competencies
        if(competencies.competencies.length < 1){
                competencies.competencies.push({skill: course.competencies[0].skill, competencies: []}) 
        }

        // if it has skills / competencies
        for(let i = 0; i < course.competencies.length; i++){
            let found = false;
            for(let j = 0; j < competencies.competencies.length; j++){
                if(course.competencies[i].skill == competencies.competencies[j].skill){
                    competencies.competencies[j].competencies.push(course.competencies[i].competency);
                    found = true;
                }
            }
            if(!found){
                competencies.competencies.push({
                    skill: course.competencies[i].skill, 
                    competencies:[course.competencies[i].competency]
                })
            }
        }
        await competencies.save();
        let res2 = await Profile.findOneAndUpdate(
            {user: req.user.id},
           { $pull: { 'currentCourses': {  _id: req.params.id } }});
        res.json(res2);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

router.put("/task/:taskId", auth, async (req, res) => {
    try {
     
        let resp = await Promise.all(
            req.body.employeeIDs.map(async employeeID => {
              let tasks = await Profile.findOne({user: employeeID}).select("tasks");
              tasks.tasks = [...tasks.tasks, {task: req.params.taskId}];
              await tasks.save();
              return tasks;
            })
        );

        res.json(resp);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});



// @route   GET api/profile/me
// @desc    get logged in users profile
// @access  private

router.get("/me", auth, async (req, res) => {
   
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate(
            "user", [
                "name"
            ]
        ).populate("tasks.task")

        if(!profile) return res.status(400).json({msg: "User not found by this name"});

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// @route   GET api/me/companies
// @desc    get 
// @access  private

router.get("/me/companies", auth, async (req, res) => {
    try {
        const companies = await Profile.findOne({user: req.user.id})
            .populate("companies.company", ["-ansatte", "-bank"]).select("company");

        if(!companies) return res.status(400).json({msg: "User not found by this name"});

        let levelDownCompanies = [];
        for(let i in companies.companies){
            levelDownCompanies.push(companies.companies[i].company);
        }
        res.json(levelDownCompanies);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// @route   POST api/profile
// @desc    Create/update profile
// @access  private

router.post("/", auth,  async (req, res) =>{
    const {bio, title} = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.bio = bio;
    profileFields.title = title;
    
    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {
                $set: profileFields
            }, {new: true});

            return res.json(profile);
        }

        // create profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// @route   GET api/profile
// @desc    Get all profiles
// @access  public

router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name"]);
        res.json(profiles);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route   GET api/profile/user/:id
// @desc    Get a specific profile
// @access  public

router.get("/user/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.id}).populate("user", ["name"]);
        if(!profile) res.json({msg: "User is not here"});
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route   GET api/profile/competency/:userID/:skill
// @desc    Gets list of competencies of that skill and user
// @access  private

router.get("/competency/:userID/:skill", auth, async (req, res) => {
    try {
        const profile = await Profile.aggregate([
            {
                "$match": {
                    "user": mongoose.Types.ObjectId(req.params.userID)
                }
            },
            {
                "$unwind": "$competencies"
            },
            {
                "$match": {
                    "competencies.skill": req.params.skill
                }
            },
            {
                $project: {
                    competencies: 1
                  
                }
            }   
        ])

        if(profile.length > 0)
            res.json(profile[0].competencies.competencies);
        else res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }

});



// @route       PUT api/profile/removetask/:id
// @desc        Removes a task from the profile
// @access      Private

router.put('/removetask/:id', auth, async (req,res) => {
   
    try {
        await Profile.findOneAndUpdate(
            { user: req.user.id}, 
            { $pull : { "tasks": {task: req.params.id} }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;