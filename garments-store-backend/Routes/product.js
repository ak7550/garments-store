const express = require('express');
const { isSignedIn, isAdmin, isAuthenticated } = require('../Controllers/auth');
const { getProductById, getProduct, updateProduct, deleteProduct, getAllProducts, createProduct, updateStockCount, getProductsFromSameCategory, addReview, deleteReview } = require('../Controllers/product');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

router.param("productId", getProductById); // code written
router.param("userId", getUserById); // code written


//product routes
router.get("/:productId", getProduct); // code written
router.get("/products", getAllProducts); // code written
router.get("/:productId/getCategoryProducts", getProductsFromSameCategory);  // code written

//protected routes
router.post("/:userId/createProduct", isSignedIn, isAuthenticated, isAdmin, createProduct); // code written
router.put("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, updateProduct); // code written
router.delete("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, deleteProduct); // code written
router.post("/:userId/:productId/updateStockCount", isSignedIn, isAuthenticated, updateStockCount); // code written
router.put("/:userId/:productId/review", isSignedIn, isAuthenticated, addReview);
router.delete("/:userId/:productId/review", isSignedIn, isAuthenticated, deleteReview);

module.exports = router;