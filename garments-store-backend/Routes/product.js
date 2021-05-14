const express = require('express');
const { isSignedIn, isAdmin, isAuthenticated } = require('../Controllers/auth');
const { getCategoryById } = require('../Controllers/category');
const { getProductById, getProduct, updateProduct, deleteProduct, getAllProducts, createProduct, updateStockCount, getProductsFromSameCategory, addReview, deleteReview, addToWatchList, removeFromWatchList, makeCountNegative, getAllCategoryProducts } = require('../Controllers/product');
const { getUserById, getAllWatchListItem } = require('../Controllers/user');
const router = express.Router();

//middlewares
router.param("productId", getProductById);
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//product routes
router.get("/products", getAllProducts);
router.get("/:productId", getProduct);
router.get("/:productId/getCategoryProducts", getProductsFromSameCategory);
router.get("/:categoryId/products", getAllCategoryProducts); //_ new addition


//protected routes
router.post("/:userId/createProduct", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.put("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);
router.put("/:userId/:productId/stockCount", isSignedIn, isAuthenticated, isAdmin, updateStockCount);
router.delete("/:userId/:productId/stockCount", isSignedIn, isAuthenticated, isAdmin, makeCountNegative, updateStockCount);

//public routes
router.put("/:userId/:productId/review", isSignedIn, isAuthenticated, addReview);  //!problem
router.delete("/:userId/:productId/review", isSignedIn, isAuthenticated, deleteReview);
router.put("/:userId/:productId/watchList", isSignedIn, isAuthenticated, addToWatchList);
router.get("/:userId/watchList", isSignedIn, isAuthenticated, getAllWatchListItem);
router.delete("/:userId/:productId/watchList", isSignedIn, isAuthenticated, removeFromWatchList);

module.exports = router;