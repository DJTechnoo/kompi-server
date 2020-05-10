const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Skill = require('../models/Skill');
const Company = require('../models/Company');
const mongoose = require('mongoose'); // for ObjectId 



// @route       POST api/skills/skillify/:id
// @desc        Send a skill / or add logged user to skill in company
// @access      Private

router.post('/skillify/:id', auth, 
    async (req,res) =>{

        try {
            var company = await Company.findById(req.params.id);
            if(!company) return res.status(400).json({ msg: 'Company does not exist'});
            
            let reqSkill = req.body.skill;
            
            
            let resp = await Promise.all(
                reqSkill.map(async skill => {
                    let existingSkill = await Skill.findOne({company: company._id, skill: skill});
                    if(!existingSkill){

                        console.log(skill + " does not exist. Adding to company");
                        const newSkill = new Skill( {
                            skill: skill,
                            company: company._id,
                            employees: [req.user.id] // adds logged in user
                        });
                        
                        await newSkill.save();
                        return newSkill;
                    }
                    
                    else {
                        console.log(skill + " does exist! Adding user to skill list");
                        existingSkill.employees.addToSet(req.user.id);
                        await existingSkill.save(); 
                        return existingSkill;    
                    }
                })
            );
                
    
            
            res.json(resp);
            

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});


// @router      GET api/skills/graph/:id
// @desc        Get Skills of selected company as graph
// @access      Private
router.get('/graph/:id', auth,

    
    async (req, res) => {

    try {
       
        const skills = await Skill.aggregate([
            {$match: {company: mongoose.Types.ObjectId(req.params.id)}},
            {
                $project: {
                    skill: 1,
                    employee_count: { $size: "$employees" }
                }
            },
            { $sort : { employee_count : -1} },
            { $limit: 6 }
        ])

        
        res.json(skills);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/skills/:id
// @desc        Get Skills of selected company
// @access      Private
router.get('/:id', auth,

    
    async (req, res) => {

    try {
       
        const skills = await Skill.find({company: req.params.id})
                                .select('skill');

        
        res.json(skills);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/skills/:id/:skill
// @desc        Get Employees of selected company and skill
// @access      Private
router.get('/:id/:skill', auth,

    
    async (req, res) => {

    try {
       
        const employees = await Skill.findOne({company: req.params.id, skill: req.params.skill})
                                .select('employees').populate("employees", ["name"]);

        
        res.json(employees.employees);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;