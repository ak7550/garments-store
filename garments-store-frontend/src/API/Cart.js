import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'

export const addToCartAPI = (userId, productId, sizeObj, next, error) => {
    sizeObj.quantity = 1;
    axios.post(`${API}/cart/${userId}/${productId}/cart`, sizeObj)
        .then(res => next(res.data))
        .catch(err => error(err));
}

export const getCartAPI = (cartId, userId, next, error) =>
    axios.get(`${API}/cart/${userId}/${cartId}`)
        .then(res => next(res.data))
        .catch(err => error(err));

export const removeFromCartAPI = (cartId, userId, next, error) =>
    axios.delete(`${API}/cart/${userId}/${cartId}`)
        .then(res => next(res.data))
        .catch(err => error(err));

export const updateQuantityAPI = (productId, userId, size, next, error) =>
    axios.put(`${API}/cart/${userId}/${productId}/cart`, { size })
        .then(res => next(res.data))
        .catch(err => error(err));