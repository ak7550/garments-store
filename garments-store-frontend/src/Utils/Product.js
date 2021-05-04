import localforage from 'localforage';
import { getAllProductAPI } from '../API/Product';


export const loadAllProducts = (index, next) => {
    localforage.getItem("categoryList", (err, value) => {
        console.log("category is: ", value[index]);
        localforage.getItem(`Products${value[index]._id}`, (err, val) => {
            val ? next(val) : getAllProductAPI(value[index]._id, next);
        });
    });
}
