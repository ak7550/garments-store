const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.objectId,
        ref: "Product"
    }],
    transactionId: mongoose.objectId,
    address: String,
    totalCost: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);