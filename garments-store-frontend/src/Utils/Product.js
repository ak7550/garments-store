import localforage from 'localforage';
import { getAllCategoryProductAPI } from '../API/Product';


export const loadAllProducts = (index, next) => {
    localforage.getItem("categoryList", (err, categoryList) => {
        console.log("category is: ", categoryList[index]);
        localforage.getItem(`Category${categoryList[index]._id}`, (err, productList) => {
            productList ? next(productList) : getAllCategoryProductAPI(categoryList[index]._id, next);
        });
    });
}
