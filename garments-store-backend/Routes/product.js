const express = require('express');
const { isSignedIn, isAdmin, isAuthenticated } = require('../Controllers/auth');
const { getProductsFromSameCategory } = require('../Controllers/category');
const { getProductById, getProduct, updateProduct, deleteProduct, getAllProducts, createProduct } = require('../Controllers/product');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

router.param("productId", getProductById); // code written
router.param("userId", getUserById); // code written


//product routes
router.get("/:productId", getProduct); // code written
router.get("/products", getAllProducts); // code written
router.get("/:productId/categoryProduct", getProductsFromSameCategory);  //TODO

//protected routes
router.post("/:userId/createProduct", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.put("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);


module.exports= router;