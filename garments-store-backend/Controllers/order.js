const Order = require('../models/order');
const { v4: uuidv4 } = require('uuid'); // https://www.npmjs.com/package/uuid
const Razorpay = require('razorpay');
const Product = require("../models/product");
require('dotenv').config();

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


//_working fine
exports.createOrder = async (req, res) => {
    const { userProfileInfo: user } = req;

    // check if the all the product quantities are available before taking the money
    // method to update the stock count and save it
    user.shoppingCart.forEach(cartItem => {

        // -> productDetail is an id only, we have to fetch the info from Product
        Product.findById(cartItem.productDetail)
            .exec((err, pr) => {
                if (err)
                    return res.status.json({
                        msg: `product does not exist anymore`
                    });
                // cartItem.productDetail = pr;

                // console.log(`productDetail: `, JSON.stringify(cartItem.productInfo));

                if (pr.getQuantity(cartItem.size) < cartItem.quantity)
                    return res.status(400).json({
                        msg: `${cartItem.quantity} is not available for ${cartItem}.\n Please decrease your order qunatity or delete the product.`
                    });

                else {
                    pr.improveStockCount(cartItem.size, cartItem.quantity * -1);
                    pr.save(err => {
                        if (err)
                            return res.status(400).json(err);
                    });
                    console.log(`finally pr is: `, JSON.stringify(pr));
                }
            });
    }
    );


    const countTotalCost = () => {
        let sum = 0;
        user.shoppingCart.forEach(product =>
            sum += (product.quantity * product.costOfEachItem)
        );
        return sum;
    }

    //_ order detail to store into db
    const orderObj = {
        products: user.shoppingCart,
        user,
        address: req.body.address,
        totalCost: countTotalCost(),
    };


    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    //docs:https://razorpay.com/docs/api/orders/#create-an-order
    const razorPayOptions = {
        amount: orderObj.totalCost*100,
        currency: "INR",
        receipt: uuidv4(),
    };


    razorpay.orders.create(razorPayOptions, function(err, ord) {
        if (err || !ord)
            return res.status(400).json(err);
        else {
            orderObj.transactionDetails = ord; //-> now i have included razorpay info to my order db obj
            console.log(`rzo: `, orderObj);

            const order = new Order(orderObj); //-> creating the object

            order.save(err => {
                if (err) return res.status(400).json(err);
            });

            //_ empty the shopping cart
            user.shoppingCart = [];
            user.orders.push(order);
            user.save(err => {
                if (err) return res.status(400).json(err);
            });

            return res.status(200).json({ order, user });
        }
    });


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