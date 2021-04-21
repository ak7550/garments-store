const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getUserById, getUser, updateUser, deleteUser, deleteAllUser, getAllUser, uploadProfilePic, getProfilePic, deleteProfilePic, addFollowing, removeFollowing } = require('../Controllers/user');
const router = express.Router();

// http://expressjs.com/en/5x/api.html#app.param
router.param("userId", getUserById);
router.get("/:userId", isSignedIn, isAuthenticated, getUser); // done
router.put("/:userId", isSignedIn, isAuthenticated, updateUser); 
router.delete("/:userId", isSignedIn, isAuthenticated, deleteUser);
router.get("/:userId/getAllUser", isSignedIn, isAuthenticated, getAllUser); // done
router.post("/:userId/profilePic", isSignedIn, isAuthenticated, uploadProfilePic);
router.get("/:userId/profilePic", isSignedIn, isAuthenticated, getProfilePic);
router.delete("/:userId/profilePic", isSignedIn, isAuthenticated, deleteProfilePic);
router.post("/:userId/addFollowing", isSignedIn, isAuthenticated, addFollowing);
router.post("/:userId/removeFollowing", isSignedIn, isAuthenticated, removeFollowing);

//testing route
router.get("/:userId/checkSignedIn", isSignedIn, isAuthenticated, (req, res) => res.status(200).json({
    user: req.userProfileInfo,
    msg: `is signedIn`
}));


//! this will destroy your life, make it highly highly protected
//* THE MOST EVIL API
router.get("/:userId/deleteAllUser", isSignedIn, isAuthenticated, isAdmin, deleteAllUser); //done
module.exports = router;