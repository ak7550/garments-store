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

export const createProductAPI = () => {

}
export const deleteProductAPI = () => {

}
