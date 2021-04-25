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
        enum: ["S", "M", "L", "XL", "XXL"],
    },
    quantity: {
        type: Number,
        default: 1,
    },
    costOfEachItem: {
        type: Number,
        default: 1000,
    },
});

ProductCartSchemma.virtual("totalCost").set(function () {
    return this.costOfEachItem * this.quantity;
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchemma);
module.exports = ProductCart;