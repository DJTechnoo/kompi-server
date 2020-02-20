const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Company = require('../models/Company');
const Profile = require('../models/Profile');
const User = require('../models/User');


// @router      GET api/companies
// @desc        Get all companies
// @access      Private
router.get('/', auth, 

    
async (req, res) => {

try {
    const companies = await Company.find().populate("user", ["name"]);
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
       
        const companies = await Company.find({user: req.user.id}).populate("user", ["name"]);
        res.json(companies);

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
    const user = await User.findById(req.user.id).select('-password');

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