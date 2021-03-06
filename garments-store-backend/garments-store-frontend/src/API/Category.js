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
            next(res.data.cate);
        })
        .catch(err => handleError(err));
}

export const deleteCategoryAPI = (userId, cateInfo, next, handleError) => {
    console.log(cateInfo);
    axios.delete(`${API}/category/${userId}/${cateInfo._id}`)
        .then(res => {
            console.log(`response is: ${res.data}`);
            getAllCategoryAPI(next);
        })
        .catch(err => handleError(err));
}


//*write
export const updateCategoryAPI = (userId, cateId, cateInfo, next, handleError) => {
    axios.put(`${API}/category/${userId}/${cateId}`, cateInfo)
        .then(res => {
            console.log(`res: `, res.data.cate);
            getAllCategoryAPI(data => { });
            next(res.data.cate);
        })
        .catch(err => handleError(err));
}
