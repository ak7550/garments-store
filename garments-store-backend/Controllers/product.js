const Product = require("../models/product");
exports.createProduct = (req, res) => {
    const product = new Product(req.body);
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


exports.getAllProducts = (req, res) => {
    Product.find((err, allProducts) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(allProducts);
    })
}

// https://mongoosejs.com/docs/populate.html ==> docs mongoose populate, a method to populate the ref of other schemma
exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate('category').exec((err, pro) => {
        if (err) return res.status(400).json(err);
        else {
            req.product = pro;
            next();
        }
    });
}

exports.getProduct = (req, res) => res.status(200).json(req.product);