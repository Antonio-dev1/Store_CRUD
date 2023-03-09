const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const {generateCrudMethods} = require('../services/index')
const objectID = require('mongoose').Types.ObjectId;
const employeeCrud = generateCrudMethods(Employee);
const {validateDbId , raiseRecord404Error} = require('../middlewares/index');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const{authenticateJWT} = require('../middlewares/JwtAuthentication.js')
dotenv.config();
const config = require('../config.js');

router.get('/',authenticateJWT, (req, res , next) => {
    employeeCrud.getAll().
    then(data => res.status(201).json(data)).
    catch(err => next(err));
});

router.get('/:id',authenticateJWT, validateDbId, (req, res) => {
    console.log('get by ID')
    
    employeeCrud.getById(req.params.id).
    then(data => {
        if(data) 
        res.status(201).json(data)

        else raiseRecord404Error(req, res)
    })
    .catch(err => {console.log(err , 'error')
    console.log('Error somewhere')
                });
});

router.post('/', authenticateJWT,async (req, res , next) => {
    //req.body is the body of the request
    console.log(req.body)
    const newRecord = {
        fullName: req.body.fullname,
        email: req.body.email
    }

    var hashedPassword = await employeeCrud.createHash(req.body.password);
    newRecord.password = hashedPassword;


   await employeeCrud.create(newRecord)
    .then(data => res.send(data))
    .catch(err => next(err));
});

router.put('/:id', authenticateJWT,validateDbId,(req, res ,next) => {
    const updatedRecord = {
        fullName: req.body.fullName,
        email: req.body.position,
        password: req.body.location,
    }

    employeeCrud.update(req.params.id , updatedRecord)
    .then(data => {     
            if(data)
            res.send(data)
        else
        raiseRecord404Error(req, res)})
    .catch(err => next(err));
});

router.delete('/:id',authenticateJWT, validateDbId, (req, res ,next) => {
    employeeCrud.delete(req.params.id)
    .then(data => {
        if(data)
        res.send(data)
        else
        raiseRecord404Error(req, res)
    })
    .catch(err => next(err));
});

router.post('/login' , async (req , res , next)=>{
    console.log("Hello")
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const user = await employeeCrud.getUserbyEmail(email)
    console.log(user)
    
    if(!user){
        return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = await employeeCrud.verfiyPassword(password, user.password);

    if (!passwordIsValid) {
        return res.status(400).send("Invalid Credentials");
      }

      else{
    
      var token =  jwt.sign({ id: user._id }, config.JWT_token, {
        expiresIn: 86400, // 24 hours
      });

      user.token = token;
      res.status(200).json(user);
      console.log("Successful Login!")
    }



});

module.exports = router