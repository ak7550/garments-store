import { API } from '../backEnd';
import localforage from 'localforage'
import axios from 'axios';

// object destructuring
export const logInApiCall = userInfo => {
    console.log(`${userInfo}`);
}