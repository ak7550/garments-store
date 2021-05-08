import { API } from '../backEnd';
import localforage from 'localforage'
//docs: https://localforage.github.io/localForage/#installation
import axios from 'axios';

export const logInApiCall = (userInfo, next, errorLog) => {
    console.log(userInfo);
    //post request
    axios.post(`${API}/auth/signIn`, userInfo)
        .then(res => {
            localforage.setItem("user", res.data);
            console.log(`logInAPI response is: `, res.data);
            next(res.data);
        })
        .catch(error => {
            //docs: https://stackoverflow.com/questions/49967779/axios-handling-errors
            if (error.response) {
                // // Request made and server responded
                // console.log(error.response.data);
            }
            errorLog(error.response);
        });
}

export const signUpApiCall = (userData, next, errorLog) => {
    console.log(userData);
    userData.role = userData.role === "1" ? 1 : 0;
    userData.userInfo.sex = userData.gender;
    userData.userInfo.age = new Date(userData.dob).getFullYear - new Date().getFullYear;
    axios.post(`${API}/auth/signUp`, userData)
        .then(res => {
            localforage.setItem("user", res.data);
            console.log(`signUpAPI response is: `, res.data);
            next(res.data);
        })
        .catch(error => errorLog(error.response));
}
