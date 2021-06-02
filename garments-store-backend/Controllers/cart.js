const ProductCart = require('../models/productCart');


exports.getCartById = (req, res, next, id) => {
    ProductCart.findById(id)
        .populate("productDetail")
        .exec((err, cart) => {
            if (err || !cart)
                return res.status(400).json({
                    msg: `${cart} not found in db`
                });
            else {
                req.cart = cart;
                next();
            }
        })

}

exports.getCart = (req, res) => res.status(200).json(req.cart);


//_ working fine
exports.addToCart = (req, res) => {
    const { userProfileInfo: user, product } = req;

    console.log(`user is: `, user);
    console.log(`product is: `, product);

    //docs: https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
    const cartItemIndex = user.shoppingCart.findIndex(p =>
        p.productDetail.equals(product._id) && p.size == req.body.size
    );

    console.log("\n\n\n cartItemIndex", cartItemIndex);

    // if present then increase the quantity
    if (cartItemIndex >= 0) {
        user.shoppingCart[cartItemIndex].quantity += req.body.quantity; //quantity update
        user.shoppingCart[cartItemIndex].save(err => {
            if (err)
                return res.status(400).json(err);
        }); //then save it to the database
    }
    else {
        const cartItem = new ProductCart({
            productDetail: product,
            size: req.body.size,
            quantity: req.body.quantity,
            costOfEachItem: req.body.price,
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
exports.updateQuantity = (req, res) =>
    ProductCart.findByIdAndUpdate(req.cart._id,
        {
            $set: {
                quantity: req.body.quantity
            }
        },
        {
            new: true,
            overwrite: false,
        })
        .populate("productDetail")
        .exec((err, cart) =>
            (err || !cart) ?
                res.status(400).json({
                    err,
                    msg: `error updating quantity in db`
                }) :
                res.status(200).json(cart));


exports.removeThisCart = (req, res) => {
    const { userProfileInfo: user, cart } = req;
    const shoppingCart = user.shoppingCart.filter((cartObj) =>
        !(cartObj._id.equals(cart._id))
    );
    user.shoppingCart = shoppingCart;
    user.save(err => {
        if (err)
            return res.status(400).json(err);
    });
    console.log(`user is: `, user);
    ProductCart.findByIdAndDelete(cart._id, {},
        (err, cart) => {
            if (err || !cart)
                return res.status(400).json({
                    err,
                    msg: `some error occured in db.`
                });
        });
    return res.status(200).json(user);
}




//! importing them make some noise