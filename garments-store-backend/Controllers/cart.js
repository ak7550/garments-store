const ProductCart = require('../models/productCart');


//_ these two requires a lot of concentration
exports.addToCart = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const cartItemIndex = user.shoppingCart.findIndex(p => p.productDetail._id == product._id && p.size == req.body.size);

    // if present then increase the quantity
    if (cartItemIndex >= 0) {
        user.shoppingCart[cartItemIndex].quantity += req.body.quantity;
    }
    else {
        const cartItem = new ProductCart({
            productDetail: product,
            size: req.body.size,
            quantity: req.body.quantity,
            costOfEachItem: req.body.cost,
            user
        });
        cartItem.save(err => {
            if (err) return res.status(400).json(err);
        });
        user.shoppingCart.push(cartItem);
    }
    user.save(err => {
        if (err) return res.status(400).json(err);
    });
    res.status(200).json(user);
}

exports.removeFromCart = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const remainingArr = user.shoppingCart.filter(p => p.productDetail._id != product._id && p.size != req.body.size);
    user.shoppingCart = remainingArr; //update
    user.save(err => {
        if (err) return res.status(400).json(err);
    });
    res.status(200).json(user);
}

exports.updateQuantity = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const cartItemIndex = user.shoppingCart.findIndex(p => p.productDetail._id == product._id && p.size == req.body.size);
    if (cartItemIndex == -1) return res.status.json({
        msg: `the product doesnot exist to cart`
    });
    // check db present quantity and update it accordingly
    else {
        // check if the qunatities are availble into the db
        const quantity = productDetail.getQuantity(productDetail.size);
        if (quantity < req.body.quantity) return res.status(400).json({
            err: `${req.body.quantity} pieces are not availble currently.`
        });
        else {
            user.shoppingCart[cartItemIndex].quantity += req.body.quantity;
            return res.status(200).json({
                user,
                msg:`updated quantity for the ${JSON.stringify(user.shoppingCart[cartItemIndex])} is updated.`
            })
        }
    }
}



//! importing them make some noise