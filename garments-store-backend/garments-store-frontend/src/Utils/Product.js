import localforage from 'localforage';
import { getAllCategoryProductAPI, getAllProductsAPI } from '../API/Product';


export const loadAllProducts = (index, next) => {
    localforage.getItem("categoryList", (err, categoryList) => {
        console.log("category is: ", categoryList[index]);
        getAllCategoryProductAPI(categoryList[index]._id, next);
    });
}

export const getAllProducts = (next) => {
    localforage.getItem("allProductsArr", (err, productArr) => {
        console.log(`products list is: ${productArr}`);
        productArr ? next(productArr) : getAllProductsAPI(next);
    });
}
