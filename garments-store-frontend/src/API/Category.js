import axios from "axios";
import { API } from "../backEnd";
import localforage from 'localforage'

export const getAllCategoryAPI = async () => {
    console.log(`hi from getAllCategoryAPI method`);
    return axios.get(`${API}/category/allCategories`)
        .then(response => {
            console.log(`categories:`, response.data);
            localforage.setItem("categoryList", response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}