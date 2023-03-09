const mongoose = require('mongoose')
const dbURI = ''

mongoose.set('strictQuery', true)
module.exports = () => {
    return mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true});
}
