require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/user');

exports.signIn = (req, res) => {
    const errs = validationResult(req); // ==> https://express-validator.github.io/docs/running-imperatively.html
    // res.send(req.body);
    console.log(`validation result: ${JSON.stringify(errs)}`);
    // https://express-validator.github.io/docs/validation-chain-api.html
    if (!errs.isEmpty()) {
        res.status(400).json({
            errors: errs.array()
        });
    } else {
        // now we need to assign the user info into our database as a new user entry, he/she might be our customer or a seller (admin).
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const { name, email, password } = req.body; // object destructing
        // this saves the entry into our database ==> https://mongoosejs.com/docs/models.html#compiling
        const user = new User({
            fullName: name,
            email,
            password
        });
        console.log(`newly created user is: ${JSON.stringify(user)}`);
        user.save(
            (err) => {
                if (err)
                    res.status(400).json({
                        err,
                        user,
                        msg: `info is not able to saved into the database.`
                    });
                else
                    res.status(200).json({
                        user,
                        msg: `is successfully stored into the databse.`
                    });

            });
        // other information will be given later
        console.log(`kisike najar na lage`);
    }

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






