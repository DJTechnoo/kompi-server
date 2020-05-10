const mongoose = require("mongoose");

const CurrentCourseSchema = mongoose.Schema({
    name: {type: String, require:true},
    description: {type: String},
    competencies : [
        {
            skill: {type: String},
            competency: {type: String}
        } 
    ]
});


const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    bio: {
        type: String
    },


    competencies: [
        {
            skill: String,
            competencies: [String]
        }
    ],


    title: {
        type: String
    },

    companies: [
        {       
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'company'  
            }      
        }
    ],

    currentCourses: [CurrentCourseSchema],
    tasks: [
        {
            task: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'task'
            }
        }
    ]

});

module.exports = mongoose.model('profile', ProfileSchema);