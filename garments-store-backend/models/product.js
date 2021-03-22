const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: mongoose.ObjectId, // https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-ref
        //always mention from where the object id has come from
        ref: "Category",
        required: true
    },
    stockAvailable: Number,
    soldOut: {
        type: Boolean,
        default: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    size: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);

