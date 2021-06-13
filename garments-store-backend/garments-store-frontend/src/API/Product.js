import axios from '../Utils/axios';
import { API } from '../Utils/backEnd';
import localforage from 'localforage'

export const getAllCategoryProductAPI = (categoryId, next) => {
    console.log(`calling: `, `${API}/product/${categoryId}/products`);
    axios.get(`${API}/product/${categoryId}/products`)
        .then(response => {
            const { data: arr } = response;
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

export const updateProductAPI = (userId, productId, info, next, error) => {
    axios.put(`${API}/product/${userId}/${productId}`, info)
        .then(res => {
            console.log(`res is:`, res.data);
            next(res.data);
            getAllProductsAPI(data => { });
        })
        .then(err => error(err));
}


export const createProductAPI = (userId, info, next, error) => {
    axios.post(`${API}/product/${userId}/createProduct`, info)
        .then(res => {
            console.log(`res is:`, res.data.product);
            next(res.data.product);
            getAllProductsAPI(data => {
                console.log(`localfoarage has done it's job, that i dont know actually`);
            });
        })
        .then(err => error(err));
}

export const getWishListItemAPI = (userId, next) => {
    axios.get(`${API}/product/${userId}/watchList`)
        .then(res => {
            console.log(res.data);
            next(res.data);
        })
        .catch(err => console.log(err));
}

export const getProductAPI = (id, next) => {
    axios.get(`${API}/product/${id}`)
        .then(res => next(res.data))
        .catch(err => console.log(err));
}

export const addReivewAPI = (userId, productId, info, next, error) =>
    axios.put(`${API}/product/${userId}/${productId}/review`, info)
        .then(res => getProductAPI(productId, next))
        .catch(err => error(err));

export const getSimiliarProductAPI = (productid, next, error) =>
    axios.get(`${API}/product/${productid}/getCategoryProducts`)
        .then(res => next(res.data))
        .catch(err => error(err));