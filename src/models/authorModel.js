const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    "fname" : {
        type : String,
        required : true
    },
    "title" : {
        type : String,
        enum : ["Mr", "Mrs", "Miss"]
    },
    "lname" : {
        type : String,
        required : true
    },
    "password" : {
        type : String,
        required : true
    },
    "email" : {
        type : String,
        required : true,
        unique : true
    }
}, { timestamps : true})

module.exports = mongoose.model('projectAuthor', authorSchema)