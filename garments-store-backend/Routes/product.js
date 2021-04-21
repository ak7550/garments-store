const express = require('express');
const { isSignedIn, isAdmin, isAuthenticated } = require('../Controllers/auth');
const { getProductById, getProduct, updateProduct, deleteProduct, getAllProducts, createProduct, updateStockCount, getProductsFromSameCategory, addReview, deleteReview, addToWatchList, removeFromWatchList, makeCountNegative, addToCart, removeFromCart } = require('../Controllers/product');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

//middlewares
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
router.put("/:userId/:productId/stockCount", isSignedIn, isAuthenticated, isAdmin, updateStockCount); // only admins can do this
router.delete("/:userId/:productId/stockCount", isSignedIn, isAuthenticated, isAdmin, makeCountNegative, updateStockCount);

//public routes
router.put("/:userId/:productId/review", isSignedIn, isAuthenticated, addReview);  //!problem
router.delete("/:userId/:productId/review", isSignedIn, isAuthenticated, deleteReview);
router.put("/:userId/:productId/watchList", isSignedIn, isAuthenticated, addToWatchList);
router.delete("/:userId/:productId/watchList", isSignedIn, isAuthenticated, removeFromWatchList);
router.put("/:userId/:productId/cart", isSignedIn, isAuthenticated, addToCart);
router.delete("/:userId/:productId/cart", isSignedIn, isAuthenticated, removeFromCart);

module.exports = router;