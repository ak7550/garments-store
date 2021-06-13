require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');


// signUp testing done
exports.signUp = (req, res) => {
    // TODO: add the process of uploading profile picture
    const errs = validationResult(req); // ==> https://express-validator.github.io/docs/running-imperatively.html
    // res.send(req.body);
    console.log(`\n\n\n\n\nvalidation result: ${JSON.stringify(errs)}`);
    // https://express-validator.github.io/docs/validation-chain-api.html
    console.log(`request body: `, req.body);
    if (!errs.isEmpty()) {
        return res.status(400).json({
            errors: errs.array()
        });
    } else {
        // now we need to assign the user info into our database as a new user entry, he/she might be our customer or a seller (admin).
        console.log(`req.body: ${req.body}`);
        const { name, email, password, role, description = " ", userInfo } = req.body; // object destructing

        // checking if the email id is already present within our database
        User.findOne({ email }, (err, user) => {
            if (user) return res.status(400).json({
                msg: `user with ${email} already exist. Please try logging in.`
            })
            else if (err) return res.status(400).json({
                msg: `Error occured!!`
            })
        });

        // creating a new entry inside of database
        const user = new User({
            fullName: name,
            email,
            password,
            role, description, userInfo
        });

        // this saves the entry into our database ==> https://mongoosejs.com/docs/models.html#compiling
        user.save(err => {
            if (err)
                return res.status(400).json({
                msg: `Error Occured!!`
            });

            else {
                console.log(`now it's time to create the jwt token`);
                const token = jwt.sign({
                    _id: user._id
                }, process.env.secret, { expiresIn: '100h' }); // creates the token (ticket),
                res.status(200).cookie("token", token,
                    {
                        expires: new Date(Date.now() + 100 * 3600000) // cookie will be removed after 8 hours
                    });
                console.log(`jwt is parsed inside of the cookie`);
                return res.status(200).json({
                    token,
                    user,
                    msg: `is saved inside of the database.`
                })
            }
        })

        // other information will be given later
        console.log(`kisike najar na lage`);
    }

}


// signIn testing done
exports.signIn = (req, res) => {
    // res.send("building");
    // console.log(`complete req is: `);
    console.log(`req.body: `, req.body);
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        console.log(`errs: `, errs);
        return res.status(400).json({
            errors: errs.array()
        });
    } else {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const { email, password } = req.body;
        User.findOne({ email })
            .populate("shoppingCart")
            .exec((err, user) => {
            //TODO: dont send all the user info
            if (!user)
                return res.status(400).json({
                    msg: `User with ${email} doesnot exist into our database`
                })
            else if (err)
                return res.status(400).json({
                    msg: `db error`.toUpperCase()
                })
            // any problem, return with error msg


            // now we got the user, check if the passwrd is same and give entry
            if (!user.authenticate(password))
                return res.status(401).json({
                    msg: `${password} is not correct password.`,
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
                return res.status(200).json({
                    token,
                    user,
                    msg: ` has successfully signedin our database. Above is his pass.`
                })

            }
        });
    }

}


// signOut testing done
exports.signOut = (req, res) => {
    // signedOut request will go from different frontend and an order of removing the cookie will do the job
    res.clearCookie("token").status(200).json({
        msg: `user signedOut!!`
    });

}


// to check if the user is signedIn
// toughest thing to unserstand till now.
// express-jwt is possibly decoding the token of req.cookie and stores into req.user ==> consist all the information of the user who's the owner of that token
// docs ==> https://www.npmjs.com/package/express-jwt
// testing done
exports.isSignedIn = expressJwt({
    secret: process.env.secret,
    algorithms: ['sha1', 'RS256', 'HS256'], // giving an error of algorithms should be set, fixed from https://tutorial.tips/how-to-fix-error-algorithms-should-be-set-express-jwt/
})



// testing done
exports.isAdmin = (req, res, next) => {
    // when we came to here, it doesn't matter from which component you do fetch, it's confirmed that the usuer is authenticated so all the information definately match with each other
    // considering the admin role will always be 1, any value other than 1 in role is not admin (seller)
    console.log(`reached to isAdmin middle ware`);
    if (req.userProfileInfo.role !== 1) {
        console.log(`Something wrong`);
        return res.status(400).json({
            user: req.userProfileInfo,
            msg: ` is not an admin`
        })
    } else {
        console.log(`user is an admin\nwork is done in isAdmin middle ware`);
        next();
    }
}

// to check if the user is authentiated to enter into the protected route
// testing done
exports.isAuthenticated = (req, res, next) => {
    console.log(`reached to isAuthenticated middle ware`);
    // userProfileInfo is parsed into req in params method
    // By default, the decoded token is attached to req.user ==> https://www.npmjs.com/package/express-jwt
    const { userProfileInfo, user } = req // object destructuring
    // userProfileInfo says the user is signedIn in, user says that the user is signedIn in his own account adan trying to get the protected route of his own account.
    const check = user && userProfileInfo && user._id == userProfileInfo._id;
    if (!check)
     return res.status(403).json({
            userProfileInfo,
            user,
            msg: `both are not same`
        });
    else {
        // this will go long, as everything is ok, so we won't return......return will go back to the caller of the api
        console.log(`it's now authenticated.\nwork is done in isAuthenticated middle ware`);
        // you can't add multiple response to the response, it should get attach at the end, when it's ready to go back to the client
        next();
    }
}
