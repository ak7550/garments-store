const express = require("express");
const { isSignedIn, isAuthenticated } = require("../Controllers/auth");
const { getProductById } = require("../Controllers/product");
const { getUserById } = require("../Controllers/user");

const { addToCart, removeFromCart, updateQuantity, getCartById, getCart, removeThisCart } = require("../Controllers/cart");
const router = express.Router();

//params
router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("cartId", getCartById);

//routes
router.get("/:cartId", getCart);
router.post("/:userId/:productId/cart", isSignedIn, isAuthenticated, addToCart);
router.put("/:cartId", updateQuantity);
router.delete("/:userId/:cartId", isSignedIn, isAuthenticated,  removeThisCart);

module.exports = router;