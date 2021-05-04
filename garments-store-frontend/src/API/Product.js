import axios from "axios";
import { API } from "../backEnd";
import localforage from 'localforage'

export const getAllProductAPI = (categoryId, next) => {
    console.log(`calling: `, `${API}/product/${categoryId}/products`);
    axios.get(`${API}/product/${categoryId}/products`)
        .then(response => {
            const { data: arr } = response;
            localforage.setItem(`Products${categoryId}`, arr, (err, value) => {
                console.log(`va==> `, value);
                next(value);
            });
            next(response.data);
        })
        .catch(err => console.log(err));
}
