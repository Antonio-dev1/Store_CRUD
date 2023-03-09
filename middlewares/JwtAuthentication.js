const jwt = require('jsonwebtoken');
const config = require('../config.js');
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
        console.log(token)
        console.log(config.JWT_token)
      jwt.verify(token, config.JWT_token, (err, user) => {
        if (err) {
            console.log(err);
            console.log(user)
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
        console.log("Invalid Token")
      res.sendStatus(401);
    }
  }
  
  // middleware to check if user is an admin
  function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  module.exports = {
    authenticateJWT,
    isAdmin
  };