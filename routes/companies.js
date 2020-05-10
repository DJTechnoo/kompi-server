const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Company = require('../models/Company');
const Profile = require('../models/Profile');
const User = require('../models/User');
const mongoose = require('mongoose'); // for ObjectId 


// @router      GET api/companies
// @desc        Get all companies
// @access      Private

router.get('/', auth, 

    
async (req, res) => {

try {
    const companies = await Company.find()
    .select('user, name')
    .populate("user", ["name"]);
    res.json(companies);

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}

});


// @router      GET api/companies/mine
// @desc        Get companies owned by logged in user
// @access      Private

router.get('/mine', auth, 

    
    async (req, res) => {

    try {
       
        const companies = await Company.find({user: req.user.id})
        .select('user, companyName')
        .populate("user", ["name"]);
        res.json(companies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/companies/mine/:id
// @desc        Get SPECIFIC owned Company by logged in user
// @access      Private

router.get('/mine/:id', auth, 

    
    async (req, res) => {

    try {
       
        const company = await Company.findOne({_id: req.params.id})
            .select('-bank')
            .populate("user", ["name", "_id"])
            .populate("ansatte.user", ["_id", "name"]);
        if(company.user._id == req.user.id) res.json(company);
        else {
            res.json({msg: "Unauthorized"});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/companies/profile/:id
// @desc        Get PROFILE of Company
// @access      Private

router.get('/profile/:id', auth, 

    
    async (req, res) => {

    try {
       
        const company = await Company.findOne({_id: req.params.id})
            .select('companyName');

        res.json(company);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/companies/mine/bank/:id
// @desc        Get Skillbank of selected company
// @access      Private

router.get('/mine/bank/:id', auth,

    
    async (req, res) => {

    try {
       
        const skills = await Company.findOne({_id: req.params.id})
                                .select('-bank.users -ansatte');

        if(skills.user == req.user.id) 
            res.json(skills);
        else return res.status(400).send("Unauthorized");
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/companies/mine/bank/:id/:skill
// @desc        Get Skillbank of selected company
// @access      Private   

router.get('/mine/bank/:id/:skill', auth,

    
    async (req, res) => {

    try {
       const owner = await (await Company.findOne(req.params.id)).select("user");
       if(owner.user == req.user._id){
        const users = await Company.aggregate([
            { 
                $match: { _id: mongoose.Types.ObjectId(req.params.id) } 
            },
            {
                $project: {
                    users: {
                        $filter: {
                            input: "$bank",
                            cond: { $eq: ["$$this.skill", req.params.skill] }
                        }
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        users: { $arrayElemAt: ["$users.users", 0] }
                    }
                }
            }
        ])
          
        const result = users[0].users;
        await User.populate(result, {path: "user", select:  {_id: 1, name: 1}});

            res.json(result);
    }
    else return res.status(400).send("Unauthorized");
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      GET api/companies/:companyName
// @desc        Get company by name
// @access      Private

router.get('/:companyName', auth, 

    
    async (req, res) => {

    try {
        let companyName = req.params.companyName;
        const companies = await Company
            .find({companyName: new RegExp(`^${companyName}$`, 'i')})
            .populate("user", ["name"]);
            
        res.json(companies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @router      Post api/companies
// @desc        Create a company
// @access      Private

router.post('/', auth, 
    
async (req, res) => {

try {
    
    const newCompany = new Company( {
        companyName: req.body.companyName,
        user: req.user.id,
        bank: []
        })
    
    const company = await newCompany.save();

    res.json(company);

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}

})


// @route       PUT api/companies/join/:id
// @desc        Join a company
// @access      Private

router.put('/join/:id', auth, 
    async (req,res) =>{

        try {
            const profile = await Profile.findOne({user: req.user.id}); // Newly joined company should also show here
            if(profile === null) return res.status(400).json({msg: "Can't join without profile"});
            const company = await Company.findById(req.params.id);

            //Check if the user already exists in the company
            if(company.ansatte.filter(employee => employee.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ msg: 'Already Joined'});
            }

            company.ansatte.unshift({ user: req.user.id});

            await company.save();

            profile.companies.unshift({company: req.params.id});
            
            await profile.save();

            res.json(company.ansatte);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});


// @route       PUT api/companies/skillify/:id
// @desc        Send a skill / or add logged user to skill in company
// @access      Private

router.put('/skillify/:id', auth, 
    async (req,res) =>{

        try {
            var company = await Company.findById(req.params.id);
            if(!company) return res.status(400).json({ msg: 'Company does not exist'});
            
            let reqSkill = req.body.skill
            let bank = company.bank;
            let index = -1;
            for(let i in bank){
                if(bank[i].skill == reqSkill) index = i;
            }

            // If the skill doesn't already exist yet, add it
            if(index == -1) bank.push({skill: reqSkill, users:[{user: req.user.id}]})
            else { // Else add the user to the existing skill list
                bank[index].users.push({user: req.user.id});
            }

            await company.save();
            res.json(bank);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});



module.exports = router;