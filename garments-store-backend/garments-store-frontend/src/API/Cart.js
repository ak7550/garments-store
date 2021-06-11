import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'
import localforage from 'localforage'
import { getUserAPI } from './User';

export const addToCartAPI = (userId, productId, sizeObj, next, error) => {
    sizeObj.quantity = 1;
    let token = undefined;
    localforage.getItem("user")
        .then(user => {
            token = user.token;
            axios.post(`${API}/cart/${userId}/${productId}/cart`, sizeObj)
                .then(res => {
                    const newUser = res.data;
                    newUser.token = token;
                    localforage.setItem("user", newUser)
                        .then(user => next(user))
                        .catch(err => error(err));
                })
        });
}

export const getCartAPI = (cartId, next, error) =>
    axios.get(`${API}/cart/${cartId}`)
        .then(res => next(res.data))
        .catch(err => error(err));


export const removeFromCartAPI = (cartId, userId, next, error) =>
    localforage.getItem("user", (err, u) => {
        const token = u.token;
        axios.delete(`${API}/cart/${userId}/${cartId}`)
            .then(res => {
                console.log(res.data);
                const user = res.data;
                user.token = token;
                localforage.setItem("user", user, (err, user) => next(user));
            })
            .catch(err => error(err));
    });

export const updateQuantityAPI = (cartId, userId, quantityObj, next, error) =>
    axios.put(`${API}/cart/${cartId}`, quantityObj)
        .then(res => getUserAPI(userId, u => next(u, res.data))) // getting the cart information not the
        .catch(err => error(err));
