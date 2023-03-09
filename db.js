const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://root:root@testcluster.ouvylfi.mongodb.net/store_DB?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)
module.exports = () => {
    return mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true});
}
