import axios from '../Utils/axios';
import { API } from '../Utils/backEnd';
import localforage from 'localforage'

export const getAllCategoryAPI = next => {
    console.log(`hi from getAllCategoryAPI method`);
    axios.get(`${API}/category/allCategories`)
        .then(response => {
            console.log(`categories:`, response.data);
            localforage.setItem("categoryList", response.data);
            next(response.data);
        })
        .catch(err => console.log(err));
}

export const createCategoryAPI = (userId, cateInfo, next, handleError) => {
    axios.post(`${API}/category/${userId}/createCategory`, cateInfo)
        .then(res => {
            localforage.removeItem("categorryList");
            getAllCategoryAPI(data => { });
            localforage.setItem(`category${res.data.cate}`)
                .then(data => console.log(`${data} is saved to the database.`));
            next(res.data.cate);
        })
        .catch(err => handleError(err));
}

export const deleteCategoryAPI = (userId, cateInfo, next, handleError) => {
}