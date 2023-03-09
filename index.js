const express = require('express')
// To convert the body of the request to JSON
const bodyParser = require('body-parser')

const cors = require('cors')

const {errorHandler} = require('./middlewares/index')

const employeeRoutes = require('./controllers/employee.controller.js')
const productRoutes = require('./controllers/products.controller')
const app = express()
app.use(bodyParser.json())
//app.use(errorHandler)
//app.use(cors({origin: 'http://localhost:4200'}))
app.use('/api/employees', employeeRoutes)
app.use('/api/products/' , productRoutes)

// Local imports
const connectDb = require('./db')
connectDb().then(() => {
    console.log('Database connected')
    app.listen(3000, () => console.log('Server started on port 3000'))
}).catch(err => console.log(err))
