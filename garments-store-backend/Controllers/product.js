const Product = require('../models/product');
exports.createProduct = (req, res) => {
    Product.findOne({ name: req.body.name }, (err, product) => {
        if (err) return res.status(400).json({
            msg: `Error occured!!`
        });
        else if (product) return res.status(400).json({
            msg: `${req.body.name} already exists into the database.`
        });
    });

    //* TODO
    const product = new Category(req.body);
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
    
}


exports.getAllProducts = (req, res) => {
    Product.find((err, allProducts) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(allProducts);
    })
}

exports.getProductById = (req, res, next, id) => {
    Product.find(id, (err, pro) => {
        if (err) return res.status(400).json(err);
        else req.product = pro;
    });
    next();
}

exports.getProduct = (req, res) => res.status(200).json(req.product);