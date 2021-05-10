import { API } from '../Utils/backEnd';
import localforage from 'localforage'
import axios from '../Utils/axios';
//docs: https://localforage.github.io/localForage/#installation

export const logInApiCall = (userInfo, next, errorLog) => {
    console.log(userInfo);
    //post request
    axios.post(`${API}/auth/signIn`, userInfo)
        .then(res => {
            const { user, token } = res.data;
            user.token = token;
            localforage.setItem("user", user);
            console.log(`logInAPI response is: `, res.data);
            axios.defaults.headers['Authorization'] = `Bearer ${user.token}`;
            next(res.data.user);
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
    console.log("userDate to pass: ", userData);
    axios.post(`${API}/auth/signUp`, userData)
        .then(res => {
            localforage.setItem("token", res.data.token);
            localforage.setItem("user", res.data.user);
            console.log(`signUpAPI response is: `, res.data);
            axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
            next(res.data.user);
        })
        .catch(error => errorLog(error.response));
}

export const logOutApiCall = (next, handleErr) => {
    axios.get(`${API}/auth/signOut`)
        .then(res => {
            console.log(`user signedOut.\n ${JSON.stringify(res.data)}`);
            axios.defaults.headers['Authorization'] = ``; // making it null
            localforage.removeItem("token");
            localforage.removeItem("user"); //deleting the local data
            next(res.data);
        })
        .catch(err => {
            console.log(`err occured.\n ${JSON.stringify(err)}`);
            handleErr(err);
        });
    //todo: remove token from axios header
}
