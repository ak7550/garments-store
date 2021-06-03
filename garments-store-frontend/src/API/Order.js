import { API } from '../Utils/backEnd'
import localforage from 'localforage'
import axios from '../Utils/axios'

//!testing needs to be done
const razorPayCheckOutPopUp = (data, user) => {
    console.log("razorpay data is: ", data);

    //docs: https://razorpay.com/docs/payment-gateway/quick-integration/#step-2-pass-order-id-and-other-options
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        name: "Payment Options",
        description: "Wallet Transaction",
        image: "http://localhost:1337/logo.png",
        order_id: data.id,
        handler: function (response) {
            alert("PAYMENT ID ::" + response.razorpay_payment_id);
            alert("ORDER ID :: " + response.razorpay_order_id);
        },
        prefill: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


export const createOrderAPI = (userId, next) => {
    let token = undefined;
    localforage.getItem("user")
        .then(u => {
            token = u.token;
            axios.post(`${API}/order/${userId}/order`)
                .then(res => {
                    const { order, user } = res.data;
                    user.token = token;
                    razorPayCheckOutPopUp(order.transactionDetails, user);
                    next(user);
                })
        });
}
