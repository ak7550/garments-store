import axios from '../Utils/axios';
import { API } from "../backEnd";
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
