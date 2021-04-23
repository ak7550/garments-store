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
    order.save(err => {
        if (err) return res.status(400).json(err);
    });

    // method to update the stock count
    user.shoppingCart.forEach(cartItem =>
        cartItem.productDetail.improveStockCount(cartItem.size, cartItem.quantity * -1)
    );
    //empty the shopping cart
    user.shoppingCart = [];
    user.save(err => {
        if (err) return res.status(400).json(err);
    });

    return res.status(200).json(order);
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






