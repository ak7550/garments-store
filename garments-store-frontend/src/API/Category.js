import axios from '../Utils/axios';
import { API } from "../backEnd";
import localforage from 'localforage'

export const getAllCategoryAPI = next => {
    console.log(`hi from getAllCategoryAPI method`);
    axios.get(`${API}/category/allCategories`)
        .then(response => {
            console.log(`categories:`, response.data);
            localforage.setItem("categoryList", response.data);
            next(response.data);
        })
        .catch(err =>
            console.log(err)
        );
}