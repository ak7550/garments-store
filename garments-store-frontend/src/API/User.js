import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'
import localforage from 'localforage'

export const getUserAPI = (userId, next) => {
    axios.get(`${API}/user/${userId}`)
        .then(res => {
            const { userProfileInfo } = res.data;
            next(userProfileInfo);
        })
        .catch(err => console.log(err));
}

export const updateUserAPI = (userInfo, id, next, errorHandler) => {
    console.log(`hi from updateuserapi`);
    console.log(`formatte info is: `, userInfo);
    axios.put(`${API}/user/${id}`, userInfo)
        .then(res => {
            const { user } = res.data;
            console.log(`updated user: `, user);
            localforage.setItem(`user`, user);
            next(user);
        })
        .catch(err => {
            console.log(`err from the server is: `, err);
            errorHandler(err);
        })
}

export const getFollowersAPI = (id, next) => {
    axios.get(`${API}/user/${id}/followers`)
        .then(res => {
            console.log(`data is: `, res.data);
            next(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

export const getFollowingsAPI = (id, next) => {
    axios.get(`${API}/user/${id}/followings`)
        .then(res => {
            console.log(`data is: `, res.data);
            next(res.data);
         })
        .catch(err => {
            console.log(err);
        });
}
