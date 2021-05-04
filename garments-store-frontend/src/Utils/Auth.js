import { API } from '../backEnd';
import localforage from 'localforage'
//docs: https://localforage.github.io/localForage/#installation
import axios from 'axios';
//docs: https://www.npmjs.com/package/axios#example

//! need to work a bit
export const logInApiCall = userInfo => {
    //post request
    return axios.post(`${API}/auth/signIn`, userInfo)
        .then(res => {
            return res.data.json();
        })
        .catch(error => {
            //docs: https://stackoverflow.com/questions/49967779/axios-handling-errors
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.data.errors;
            }
        });
}


export const logInMethodCall = userInfo => {

}
