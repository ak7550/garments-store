const ProductCart = require('../models/productCart');


//_ working fine
exports.addToCart = (req, res) => {
    const { userProfileInfo: user, product } = req;

    //soln: https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
    const cartItemIndex = user.shoppingCart.findIndex(p => p.productDetail.equals(product._id) && p.size == req.body.size);

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
        console.log(`cartItem: ${JSON.stringify(cartItem)}`);
        user.shoppingCart.push(cartItem);
    }
    user.save(err => {
        if (err) return res.status(400).json(err);
    });
    return res.status(200).json(user);
}

//_working fine
exports.removeFromCart = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const remainingArr = user.shoppingCart.filter(p => !p.productDetail._id.equals(product._id) && p.size != req.body.size);
    user.shoppingCart = remainingArr; //update
    user.save(err => {
        if (err) return res.status(400).json(err);
    });
    res.status(200).json(user);
}

//_ working fine
exports.updateQuantity = (req, res) => {
    const { userProfileInfo: user, product } = req;
    const cartItemIndex = user.shoppingCart.findIndex(p => p.productDetail._id.equals(product._id) && p.size == req.body.size);
    console.log(`cartItemIndex: ${cartItemIndex}`);
    if (cartItemIndex == -1)
        return res.status(400).json({
            msg: `the product doesnot exist to cart`
        });
    // check db present quantity and update it accordingly
    else {
        // check if the qunatities are availble into the db
        console.log(`Item: ${JSON.stringify(user.shoppingCart[cartItemIndex])}`);
        const quantity = product.getQuantity(req.body.size);
        console.log(`quantity: ${quantity}`);
        if (quantity < req.body.quantity) return res.status(400).json({
            err: `${req.body.quantity} pieces are not availble currently.`
        });
        else {
            user.shoppingCart[cartItemIndex].quantity += req.body.quantity;
            user.save(err => {
                if (err) return res.status(400).json(err);
            });
            return res.status(200).json({
                user,
                msg: `updated quantity for the ${JSON.stringify(user.shoppingCart[cartItemIndex])} is updated.`
            });
        }
    }
}



//! importing them make some noise