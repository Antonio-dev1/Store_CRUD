const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const {generateCrudMethods} = require('../services/products')
const objectID = require('mongoose').Types.ObjectId;
const productCrud = generateCrudMethods(Product);
const{authenticateJWT} = require('../middlewares/JwtAuthentication.js')
const {validateDbId , raiseRecord404Error} = require('../middlewares/index.js');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
dotenv.config();
const config = require('../config');

router.get('/', authenticateJWT , (req, res , next) => {
    productCrud.getAll().
    then(data => res.status(201).json(data)).
    catch(err => next(err));
});

router.get('/:id', authenticateJWT,validateDbId, (req, res) => {
    console.log('get by ID')
    
    productCrud.getById(req.params.id).
    then(data => {
        if(data) 
        res.status(201).json(data)

        else raiseRecord404Error(req, res)
    })
    .catch(err => {console.log(err , 'error')
    console.log('Error somewhere')
                });
});

router.post('/', authenticateJWT, async (req, res , next) => {
    //req.body is the body of the request
    console.log(req.body)
    const newRecord = {
        name: req.body.name,
        description: req.body.description
    }


   await productCrud.create(newRecord)
    .then(data => res.send(data))
    .catch(err => next(err));
});

router.put('/:id',authenticateJWT, validateDbId,(req, res ,next) => {
    const updatedRecord = {
        name: req.body.name,
        description: req.body.position,
    }

    productCrud.update(req.params.id , updatedRecord)
    .then(data => {     
            if(data)
            res.send(data)
        else
        raiseRecord404Error(req, res)})
    .catch(err => next(err));
});

router.delete('/:id',authenticateJWT, validateDbId, (req, res ,next) => {
    productCrud.delete(req.params.id)
    .then(data => {
        if(data)
        res.send(data)
        else
        raiseRecord404Error(req, res)
    })
    .catch(err => next(err));
});





module.exports = router;