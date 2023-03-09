const mongoose = require('mongoose')
//Structure of the Database data
module.exports = mongoose.model('Employee', {
    fullName: {type: String},
    email: {type:String},
    password:{type:String},
} , 'employees')



  