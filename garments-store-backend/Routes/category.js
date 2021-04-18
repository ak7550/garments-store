const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getCategoryById, getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../Controllers/category');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// get categories
router.get("/:categoryId", getCategory); //testing done
router.get("/allCategories", getAllCategories); //! NOT WORKING

//create
router.post("/:userId/createCategory", isSignedIn, isAuthenticated, isAdmin, createCategory); // testing done
//update
router.put("/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, updateCategory); // testing done
//delete
router.delete("/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, deleteCategory); // testing done

module.exports = router;