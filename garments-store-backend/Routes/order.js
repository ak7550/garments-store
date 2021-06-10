const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getOrderById, createOrder, getOrder, updateOrderStatus } = require('../Controllers/order');
const { getProductById } = require('../Controllers/product');
const { getUserById } = require('../Controllers/user');
const router = express.Router();

//middlewares
router.param("orderId", getOrderById);
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.post("/:userId/order", isSignedIn, isAuthenticated, createOrder);
router.get("/:userId/:orderId/order",  getOrder);
router.put("/:userId/:orderId/status", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus); // userId needs to be of Admin


module.exports = router;