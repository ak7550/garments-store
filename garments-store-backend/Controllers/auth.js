require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/user');

exports.signIn = (req, res) => {
    // console.log(`request at signIn route is: ${req.body}`);
    res.send("building");
    
}

exports.signUp = (req, res) => {
    res.send("building");

}

exports.signOut = (req, res) => {
    res.send("building");
    
}

exports.isSignedIn = (req, res, next) => {
    next();
}


exports.isAdmin = (req, res, next) => {
    
    next();
}

exports.isAuthenticated = (req, res, next) => {
    
    next();
}






