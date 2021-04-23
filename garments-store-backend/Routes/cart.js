const express = require("express");
const { isSignedIn, isAuthenticated } = require("../Controllers/auth");
const { getProductById } = require("../Controllers/product");
const { getUserById } = require("../Controllers/user");

const { addToCart, removeFromCart, updateQuantity } = require("../Controllers/cart");
const router = express.Router();

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.post("/:userId/:productId/cart", isSignedIn, isAuthenticated, addToCart);
router.put("/:userId/:productId/cart", isSignedIn, isAuthenticated, updateQuantity);
router.delete("/:userId/:productId/cart", isSignedIn, isAuthenticated, removeFromCart);

module.exports = router;