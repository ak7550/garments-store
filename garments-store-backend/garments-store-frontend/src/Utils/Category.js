import localforage from 'localforage'
import { getAllCategoryAPI } from '../API/Category'

export const loadAllCategories = next => {
    console.log(`hi from loadAllCategories`);
    // clearLocalForage();
    //docs: https://stackoverflow.com/questions/45620694/how-to-return-response-of-axios-in-return (A BIT COMPLICATED)
    // call to update localForage
    localforage.getItem("categoryList", (err, value) =>
        value ? next(value) : getAllCategoryAPI(next));
}

const clearLocalForage = () =>
    localforage.clear().finally(() => console.log(`localforage is empty now.`))
