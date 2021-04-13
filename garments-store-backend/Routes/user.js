const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getUserById, getUser, updateUser, deleteUser, deleteAllUser, getAllUser } = require('../Controllers/user');
const router = express.Router();

// http://expressjs.com/en/5x/api.html#app.param
router.param("userId", getUserById);
router.get("/:userId", isSignedIn, isAuthenticated, isAdmin, getUser); // done
router.put("/:userId", isSignedIn, isAuthenticated, updateUser); 
router.delete("/:userId", isSignedIn, isAuthenticated, deleteUser);
router.get("/", (req, res) => res.send(`in user route`));


//testing route
router.get("/:userId/checkSignedIn", isSignedIn, isAuthenticated, (req, res) => res.status(200).json({
    user: req.userProfileInfo,
    msg: `is signedIn`
}));


//! this bitch will destroy your life, make it highly highly protected
//* THE MOST EVIL API
router.get("/:userId/deleteAllUser", isSignedIn, isAuthenticated, isAdmin, deleteAllUser); //done
router.get("/:userId/getAllUser", isSignedIn, isAuthenticated, isAdmin, getAllUser); // done
module.exports = router;