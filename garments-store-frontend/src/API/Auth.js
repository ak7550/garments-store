import { API } from '../backEnd';
import localforage from 'localforage'
import axios from '../Utils/axios';
//docs: https://localforage.github.io/localForage/#installation

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
    userData.role = userData.role === "1" ? 1 : 0;
    const sex = userData.gender;
    const age = userData.dob.getFullYear() - new Date().getFullYear();
    const userInfo = { sex, age };
    userData.userInfo = userInfo;
    console.log("userDate to pass: ",userData);
    axios.post(`${API}/auth/signUp`, userData)
        .then(res => {
            localforage.setItem("user", res.data);
            console.log(`signUpAPI response is: `, res.data);
            next(res.data);
        })
        .catch(error => errorLog(error.response));
}
