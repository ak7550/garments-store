import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'

export const addToCartAPI = (userId, productId, sizeObj, next, error) => {
    sizeObj.quantity = 1;
    axios.post(`${API}/cart/${userId}/${productId}/cart`, sizeObj)
        .then(res => next(res.data))
        .catch(err => error(err));
}
