const Product = require("../models/product");
const Category = require("../models/category");
const { populate } = require("../models/product");

// _working fine
exports.createProduct = (req, res) => {
    const { name, description, category, sizes } = req.body;
    Category.findOne({ name: category }, (err, cate) => {
        if (err) return res.status(400).json(err);
        else {
            console.log(`cate id is: ${cate._id}`);
            const product = new Product({
                name, description, category: cate._id, sizes
            });
            product.save(err => {
                if (err) return res.status(400).json({
                    msg: `Error occured!!`,
                    err
                });
                else return res.status(200).json({
                    product,
                    msg: `is saved into the database successfully.`
                });
            });
        }
    });
}

// _working fine
exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.product._id, err => {
        if (err) return res.status(400).json({
            err,
            msg: `${req.product.name} has not deleted yet.`
        });
        else return res.status(200).json({
            msg: `${req.product.name} has deleted.`
        });
    });
}

// _working fine
exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.product._id, {
        $set: req.body,
    }, {
        new: true,
        overwrite: false,
    }, (err, product) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(product);
    });
}

//! not working
exports.getAllProducts = (req, res) => Product.find((err, allProducts) => err ? res.status(400).json(err) : res.status(200).json(allProducts));


// https://mongoosejs.com/docs/populate.html ==> docs mongoose populate, a method to populate the ref of other schemma
// _working fine
exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate('category').exec((err, pro) => {
        if (err) return res.status(400).json(err);
        else {
            req.product = pro;
            next();
        }
    });
}

// _working fine
exports.getProduct = (req, res) => res.status(200).json(req.product);

// _working fine
exports.updateStockCount = (req, res) => {
    Product.findById(req.product._id, (err, product) => {
        if (err) return res.status(400).json(err);
        else {
            const { size, count } = req.body;
            product.improveStockCount(size, count);
            product.save(err => !!err ? res.status(400).json(err) : res.status(200).json(product));
        }
    });
}


// _working fine
exports.getProductsFromSameCategory = (req, res) => {
    Product.find({ category: req.product.category._id }, (err, allProducts) => {
        if (err) return res.status(400).json(err);
        else res.status(200).json(allProducts);
    });
}