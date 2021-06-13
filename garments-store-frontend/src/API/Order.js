import { API } from '../Utils/backEnd'
import localforage from 'localforage'
import axios from '../Utils/axios'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

//docs: https://dev.to/soumyadey/integrate-razorpay-in-your-react-app-2nib
const razorPayCheckOutPopUp = async (data, user) => {
    console.log("razorpay data is: ", data);

    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }


    //docs: https://razorpay.com/docs/payment-gateway/quick-integration/#step-2-pass-order-id-and-other-options
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        name: "G-store",
        description: "Wallet Transaction",
        image: "https://www.nseindia.com/assets/images/NSE_Logo.svg",
        order_id: data.id,
        handler: function (response) {
            alert("PAYMENT ID ::" + response.razorpay_payment_id);
            alert("ORDER ID :: " + response.razorpay_order_id);
        },
        prefill: {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user.email,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


export const createOrderAPI = (userId, totalCost, next) => {
    let token = undefined;
    localforage.getItem("user")
        .then(u => {
            token = u.token;
            axios.post(`${API}/order/${userId}/order`, { totalCost })
                .then(res => {
                    const { order, user } = res.data;
                    user.token = token;
                    razorPayCheckOutPopUp(order.transactionDetails, user);
                    localforage.setItem("user", user);
                    next(user);
                })
        });
}


export const getOrderAPI = (userId, orderId, next) =>
    axios.get(`${API}/order/${userId}/${orderId}/order`)
        .then(res => next(res.data))
        .catch(err => console.log(err));
