const Order = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("user")
        .populate("products")
        .exec((err, order) => {
            if (err) return res.status(400).json(err);
            else {
                req.order = order;
                next();
            }
        });
}

//_ I am considering some of the things before writing the code down
exports.createOrder = (req, res) => {
    const { userProfileInfo: user } = req;
    const order = new Order({
        products: user.shoppingCart,
        user,
        // rest will taken with default values.
    });
    // method to update the stock count and save it
    user.shoppingCart.forEach(cartItem => {
        // check if the stock quantity is available
        if (cartItem.productDetail.getQuantity() < cartItem.quantity)
            return res.status(400).json({
                msg: `${cartItem.quantity} is not available for ${cartItem}.\n Please decrease your order qunatity or delete the product.`
            });
        else {
            cartItem.productDetail.improveStockCount(cartItem.size, cartItem.quantity * -1);
            cartItem.productDetail.save(err => {
                if (err)
                    return res.status(400).json(err);
            });
        }
    }
    );


    order.save(err => {
        if (err) return res.status(400).json(err);
    });


    //empty the shopping cart
    user.shoppingCart = [];
    user.save(err => {
        if (err) return res.status(400).json(err);
    });

    return res.status(200).json({ order, user });
}

exports.getOrder = (req, res) => res.status(200).json(req.order);

exports.getOrderStatus = (req, res) => res.status(200).json(req.order.status);

exports.updateOrderStatus = (req, res) => {
    req.order.status = req.body.updatedStatus;
    req.order.save(err => {
        if (err)
            return res.status(400).json(err);
    });
    return res.status(200).json(req.order);
}






