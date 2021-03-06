import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'
import localforage from 'localforage'


//!check
export const getUserAPI = (userId, next, actualUser = false) => {
    if (actualUser) {
        let token = undefined;
        localforage.getItem("user")
            .then(user => {
                token = user.token;
                axios.get(`${API}/user/${userId}`)
                    .then(res => {
                        const { userProfileInfo } = res.data;
                        userProfileInfo.token = token;
                        next(userProfileInfo);
                    })
                    .catch(err => console.log(err));
            });
    } else {
        axios.get(`${API}/user/${userId}`)
            .then(res => {
                const { userProfileInfo } = res.data;
                next(userProfileInfo);
            })
            .catch(err => console.log(err));
    }

}

export const updateUserAPI = (userInfo, id, next, errorHandler) => {
    console.log(`hi from updateuserapi`);
    console.log(`formatte info is: `, userInfo);
    let token = undefined;
    localforage.getItem("user")
        .then(u => {
            token = u.token;
            axios.put(`${API}/user/${id}`, userInfo)
                .then(res => {
                    const { user } = res.data;
                    console.log(`updated user: `, user);
                    user.token = token;
                    localforage.setItem(`user`, user);
                    next(user);
                })
                .catch(err => {
                    console.log(`err from the server is: `, err);
                    errorHandler(err);
                });
        });


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

export const getFulllNameAPI = async (id) => {
    console.log(`from the full name api`, id);
    const res = await axios.get(`${API}/user/${id}/fullName`)
    return res.data;
}


export const getAllUsersAPI = next =>
    axios.get(`${API}/user/getAllUser`)
        .then(res => next(res.data))
        .catch(err => console.log(err));

export const addFollowingAPI = (userId, followId, next) =>
    axios.put(`${API}/user/${userId}/addFollowing`, { id: followId })
        .then(res => next())
        .catch(err => console.log(`err from the server is: `, err));



export const removeFollowingAPI = (userId, followId, next) =>
    axios.put(`${API}/user/${userId}/removeFollowing`, { id: followId })
        .then(res => next())
        .catch(err => console.log(`err from the server is: `, err));