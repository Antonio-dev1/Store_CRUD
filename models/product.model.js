const mongoose = require('mongoose')
//Structure of the Database data
module.exports = mongoose.model('Product', {
    name: {type: String},
    description: {type:String},
} , 'products')