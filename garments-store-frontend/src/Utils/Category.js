import localforage from 'localforage'
import { getAllCategoryAPI } from '../API/Category'

export const loadAllCategories = next => {
    console.log(`hi from loadAllCategories`);
    // clearLocalForage();
    localforage.getItem("categoryList", (err, value) => {
        if (value == null) {
            // call to update localForage
            //docs: https://stackoverflow.com/questions/45620694/how-to-return-response-of-axios-in-return (A BIT COMPLICATED)
            getAllCategoryAPI().then(response => {
                console.log(`response: `, response);
                next( response);
            });
            // console.log(`categoryArr: `, categoryArr);
        }
        else {
            console.log(err);
            console.log(`value is not null so far.....`, value);
            next(value); //! tinni tiny bug......
        }
    });
}

const clearLocalForage = () =>
    localforage.clear().finally(() => console.log(`localforage is empty now.`))
