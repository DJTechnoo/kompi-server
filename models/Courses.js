const mongoose = require("mongoose");


const CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        require: true
    },

    description: {
        type: String
    },

    competencies : [
        {
            skill: {type: String},
            competency: {type: String}
        } 
    ],

    name: {
        type: String
    },

    date: {
        type: Date
    },

});

module.exports = mongoose.model('course', CourseSchema);