import axios from '../Utils/axios';
import { API } from '../Utils/backEnd';
import localforage from 'localforage'

export const getAllCategoryProductAPI = (categoryId, next) => {
    console.log(`calling: `, `${API}/product/${categoryId}/products`);
    axios.get(`${API}/product/${categoryId}/products`)
        .then(response => {
            const { data: arr } = response;
            localforage.setItem(`Category${categoryId}`, arr);
            next(arr);
        })
        .catch(err => console.log(err));
}

export const addToWatchListAPI = (productId, userId, next) => {
    console.log(`hi from addToWatchListAPI`);
    axios.put(`${API}/product/${userId}/${productId}/watchList`, {})
        .then(res => {
            console.log(`response is: ${res.data}`);
            localforage.setItem("user", res.data.user); // update it to our localforage
            next();
        })
        .catch(err => console.log(err));
}
export const removeFromWatchListAPI = (productId, userId, next) => {
    console.log(`hi from removeFromWatchListAPI`);
    axios.delete(`${API}/product/${userId}/${productId}/watchList`, {})
        .then(res => {
            localforage.setItem("user", res.data.user); // update it to our localforage
            console.log(`response is: ${res.data}`);
            next();
        })
        .catch(err => console.log(err));
}

export const deleteProductAPI = (userId, productInfo, next, handleError) => {
    axios.delete(`${API}/product/${userId}/${productInfo._id}`)
        .then(res => {
            console.log(`response is: ${res.data}`);
            getAllProductsAPI(next);
        })
        .catch(err => handleError(err));
}

export const getAllProductsAPI = next => {
    console.log(`hi from getAllProducts api`);
    axios.get(`${API}/product/products`)
        .then(res => {
            console.log(`all products received from server: ${res.data}`);
            next(res.data);
            localforage.setItem("allProductsArr", res.data);
        })
        .catch(err => console.log(err));
}

//*write
export const updateProductAPI = (userId, productId, info, next, error) => {
    axios.put(`${API}/product/${userId}/${productId}`, info)
        .then(res => {
            console.log(`res is:`, res.data);
            next(res.data);
            localforage.clear()
                .then(() => console.log(`localforage is cleared`));
            getAllProductsAPI(data => { });
        })
        .then(err => error(err));
}

//*write
export const createProductAPI = (userId, info, next, error) => {
    axios.post(`${API}/product/${userId}/createProduct`, info)
        .then(res => {
            console.log(`res is:`, res.data);
            next(res.data);
            localforage.clear()
                .then(() => console.log(`localforage is cleared`));
            getAllProductsAPI(data => { });
        })
        .then(err => error(err));
}
