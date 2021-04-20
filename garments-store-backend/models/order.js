const mongoose = require('mongoose');
const ProductCartSchemma = mongoose.Schema({
    productDetail: {
        type: mongoose.ObjectId,
        ref: "Product"
    },
    size: {
        type: String,
        default: "S",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    costOfEachItem: {
        type: Number,
        default: 1000,
    },
    totalCost: () => this.costOfEachItem * this.quantity,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchemma);

const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchemma],
    transactionId: mongoose.Mixed,
    address: String,
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
        enum: ["Processing", "Shipped", "Delivered", "Canceled"],
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { ProductCart, Order };