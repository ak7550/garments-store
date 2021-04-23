const mongoose = require('mongoose');
const { getString, getSize } = require("../Controllers/random");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        default: () => getString(32),
    },
    description: {
        type: String,
        trim: true,
        default: () => getString(2000),
        maxlength: 2000
    },

    category: {
        type: mongoose.ObjectId, // https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-ref
        //always mention from where the object id has come from
        ref: "Category",
        required: true //_ required
    },
    photos: [{
        data: Buffer,
        contentType: String
    }],
    imageLinks: [String],
    sizes: [{
        size: {
            type: String,
            default: "S",
            enum: ["S", "M", "L", "XL", "XXL"], //! not considering about any footwears at this point
            unique: true,
        },
        price: {
            type: Number,
            default: 1000,
        },
        stockCount: {
            type: Number, default: 2, //TODO: make a method to increase and decrease the stockCount values using api calls.
        },
        soldOut: {
            type: Boolean,
            default: true,
        },
        // _id: false, // so it doesn't make any other object id for this internal object.
    }],

    reviews: [{
        user: {
            type: mongoose.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            maxlength: 200,
            default: () => getString(200),

        },
        _id: false, // so it doesn't make any other object id for this internal object.
    }],

}, {
    timestamps: true
});

//! schema methods
productSchema.virtual("price").get(function () {
    const priceArr = Array.from(this.sizes, function (x) { return x.price; }); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    return Math.min(...priceArr); //https://www.codespeedy.com/get-maximum-and-minimum-value-from-a-javascript-array/
}).set(function (pr) {
    this.sizes.forEach(function (val, index) { val.price = !!val.price ? val.price : pr });
});

// it will increase or decrease the count of the product
productSchema.methods.improveStockCount = function (s) {
    const size = this.sizes.find(function (x) { return s.localeCompare(x.size) === 0; });
    size.stockCount = size.stockCount < 0 ? 0 : size.stockCount;
    size.stockCount += count;
    size.soldOut = size.stockCount <= 0 ? true : false;
}
productSchema.methods.getQuantity = function (s) {
    const sizeIndex = this.sizes.findIndex(function (x) { return s.localeCompare(x.size) === 0; });
    return this.sizes[sizeIndex].stockCount;
}
module.exports = mongoose.model("Product", productSchema);

