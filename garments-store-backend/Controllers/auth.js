require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/user');

exports.signUp = (req, res) => {
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
        // TODO: add buyer / seller option and other descriptions as well
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
                else {
                    const token = jwt.sign({
                        _id: user._id
                    }, process.env.secret, { expiresIn: '100h' });
                    res.cookie("token", token , {
                        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                    });
                    res.status(200).json({
                        user,
                        msg: `is successfully stored into the databse.`
                    }); // think of putting the signin process alltogether


                }


            });
        // other information will be given later
        console.log(`kisike najar na lage`);
    }

}

exports.signIn = (req, res) => {
    res.send("building");
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        res.status(400).json({
            errors: errs.array()
        });
    } else {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const { email, password } = req.body;
        User.findOne({ email }, (err, user) => {
            if (!user)
                res.status(400).json({
                    msg: `User with ${email} doesnot exist into our database`
                })
            else if (err)
                res.status(400).json({
                    msg: `db error`.toUpperCase()
                })
            else if (user.authenticate(password)) res.status(401).json({
                msg: `${password} is not correct password.`
            })
            else {
                // https://www.npmjs.com/package/jsonwebtoken
                const token = jwt.sign({
                    _id: user._id
                }, process.env.secret, { expiresIn: '100h' }); // creates the token (ticket), 
                res.status(200).cookie("token", token,
                    {
                        expires: new Date(Date.now() + 100 * 3600000) // cookie will be removed after 8 hours
                    }); //https://expressjs.com/en/api.html#res.cookie // parse token information inside cookie
                res.status(200).json({
                    token,
                    msg: `${JSON.stringify(user)} has successfully signedin our database. Above is his pass.`
                })

            }
        });
    }

}

exports.signOut = (req, res) => {
    res.clearCookie("token").status(200).json({
        msg: `${JSON.stringify(req.body.user) } is signedout!!`
    });

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






