import { API } from '../backEnd';
import localforage from 'localforage'

// object destructuring
export const logInApiCall = userInfo => {
    console.log(`${userInfo}`);
}