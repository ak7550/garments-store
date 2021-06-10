const mongoose = require('mongoose');
const { getString } = require('../Controllers/random');
const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: "ProductCart",
    }],
    transactionDetails: {
        type: mongoose.Mixed,
        required: true
    },
    address: {
        type: String,
        default: () => getString(20),
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
    totalCost: {
        type: Number,
        default: () => {
            let sum = 0;
            this.products.forEach(product => sum += product.totalCost);
            return sum;
        }
    },
    status: {
        type: String,
        default: "Processing",
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;