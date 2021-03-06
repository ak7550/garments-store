const express = require('express');
// object destructing
const { signIn, signOut, signUp } = require('../Controllers/auth');
const router = express.Router();
// object destructing
const { check } = require('express-validator'); // docs==> https://express-validator.github.io/docs/check-api.html

//testing
router.get("/", (req, res) => res.send("You are in auth route"));

//singin route
router.post("/signUp",

    check("name").isLength({ min: 5, max: 30 }).withMessage("Write your name in between 5 to 30"),
    check("email")
        .isEmail().withMessage('Valid email is required'),
    check("password")
        .isLength({ min: 3 }).withMessage(`Password needs to be atleast 3 chars long `)
        // .matches(/\d/).withMessage('must contain a number')
        // .matches(/(?=.*[A-Z])/).withMessage('Password needs to have at least one capital letter ')
        // .matches(/(?=.*[a-z])/).withMessage('Password needs to have at least one small letter ')
        // .matches(/(?=.*[!@#$&*])/).withMessage('Password needs to have a special character ')
        .not().isIn(['abc', 'password', 'god', '123']).withMessage('Do not use a common word as the password')
,
    signUp);
// docs==> https://express-validator.github.io/docs/custom-error-messages.html

router.post("/signIn",
    check("email")
        .isEmail().withMessage('Valid email is required'),
    check("password")
        .isLength({ min: 3 }).withMessage(`Password needs to be atleast 3 chars long `)
        // .matches(/\d/).withMessage('must contain a number')
        // .matches(/(?=.*[A-Z])/).withMessage('Password needs to have at least one capital letter ')
        // .matches(/(?=.*[a-z])/).withMessage('Password needs to have at least one small letter ')
        // .matches(/(?=.*[!@#$&*])/).withMessage('Password needs to have a special character ')
        .not().isIn(['abc', 'password', 'god', 'abc',]).withMessage('Do not use a common word as the password'),

    signIn);

router.get("/signOut", signOut);

module.exports = router;

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes (export import problem solved)