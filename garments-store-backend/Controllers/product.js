const Product = require("../models/product");
const Category = require("../models/category");

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
    Product.findById(id)
        .populate('category')
        .populate({
            path: "reviews",
            select: "user",
        })
        .exec((err, pro) => {
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

//!bug
exports.addReview = (req, res) => {
    const { userProfileInfo, product } = req;
    //search into the reviews.
    const userIndex = product.reviews.findIndex(obj => obj.user._id == userProfileInfo._id); //! not working

    console.log(`userIndex: ${userIndex}`);
    if (userIndex == -1)
        product.reviews.push({
            user: userProfileInfo._id,
            description: req.body.description,
        });
    else
        product.reviews[userIndex].description = req.body.description;

    product.save(err => {
        if (err) return res.status(400).json(err);
    });
    return res.status(200).json({
        msg: `${req.body.description} review is added`,
        product
    });
}

//! bug
exports.deleteReview = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const remainingReviews = product.reviews.filter(obj => obj.user != user._id); //! not wroking
    product.reviews = remainingReviews; //update
    product.save(err => {
        if (err) return res.status(400).json(err);
    });
    return res.status(200).json({
        msg: `review is deleted`
    });
}

//! bug
exports.addToWatchList = (req, res) => {
    const { userProfileInfo: user, product } = req; // object destructing
    const searchedProduct = user.watchList.find(x => x == product._id); //! same problem
    // if searchedProduct is undefined then,
    if (!searchedProduct) {
        user.watchList.push(product._id); // added to watchList
        user.save(err => {
            if (err) return res.status(400).json({ msg: `not possible to add new product` });
        });
        return res.status(200).json({ msg: `${product.name} is added into ${user.fullName}'s watchList` });
    }
    else
        return res.status(400).json({ msg: `${searchedProduct} is already present in ${user.fullName}'s watchList` });
}

//! bug
exports.removeFromWatchList = (req, res) => {
    const { userProfileInfo: user, product } = req; // object destructing
    const remainingWatchList = user.watchList.filter(x => x != product._id); //! not working
    user.watchList = remainingWatchList; // update
    user.save(err => {
        if (err) return res.status(400).json({ msg: `not possible to remove new product` });
    });
    return res.status(200).json({ msg: `${product.name} has been removed from ${user.fullName}'s watchList` });
}


exports.makeCountNegative = (req, res, next) => {
    req.body.count = req.body.count > 0 ? req.body.count * -1 : req.body.count;
    next();
}


//todo: haven't writen the code yet.
exports.addToCart = (req, res) => {
    const { userProfileInfo: user, product } = req;

}

//todo: haven't writen the code yet.
exports.removeFromCart = (req, res) => {

}