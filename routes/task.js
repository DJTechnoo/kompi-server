const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require("../models/Task");
const User = require("../models/User");
const {check, validationResult} = require("express-validator");



// @route   POST api/task
// @desc    Create/update task
// @access  private


router.post("/", auth,  async (req, res) =>{
    const {taskName, description, date, company} = req.body;
    const taskFields = {};
    
    taskFields.taskName = taskName;
    taskFields.company = company;
    taskFields.description = description;
    taskFields.date = date;
    taskFields.status = "klar";    

    try {   
        // create task
        let task = new Task(taskFields);
        await task.save();
        res.json(task);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Task Server Error");
    }
});

// @route       PUT api/task/update/:id
// @desc        Status of a task is updated
// @access      Private

router.put('/update/:id', auth, async (req,res) =>{

        try {
            const task = await Task.findById(req.params.id);
            task.status = req.body.status;
            await task.save();
            res.json(task);
           
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});



// @route       PUT api/task/add/:id
// @desc        Add employees to task
// @access      Private

router.put('/join/:id', auth, 
    async (req,res) =>{

        try {
            const task = await Task.findById(req.params.id);
            task.employees = [...task.employees, ...req.body.employees];
            task.status = "Begin";
            await task.save();
            res.json(task);
           
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});


// @router      GET api/task/:taskID
// @desc        Get task by ID
// @access      Private


router.get('/:id', auth, 

    async (req, res) => {

    try {
        let id = req.params.id;
        const task = await Task.findById(id);
            
        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @route   GET api/task
// @desc    Get all tasks
// @access  public


router.get("/", async (req, res) => {
    try {
        const task = await Task.find();
        res.json(task);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route       PUT api/task/update/:id
// @desc        Status of a task is updated
// @access      Private

router.delete('/deleteTask/:id', auth, async (req,res) =>{

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @router      GET api/task/company/:id
// @desc        Get ALL tasks from specific COMPANY
// @access      Private
router.get('/company/:id', auth, 

    async (req, res) => {

    try {
        const task = await Task.find({company: req.params.id});
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;