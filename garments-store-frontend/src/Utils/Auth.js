import { API } from '../backEnd';
import localforage from 'localforage'
//docs: https://localforage.github.io/localForage/#installation
import axios from 'axios';
//docs: https://www.npmjs.com/package/axios#example

// object destructuring
export const logInApiCall = userInfo => {
    console.log(`${JSON.stringify(userInfo)}`);
    console.log(`api is: ${API}`);
    //post request
    axios.post(`${API}/auth/signIn`, userInfo).then(res => console.log(res))
        .catch(err => console.log(err));
}