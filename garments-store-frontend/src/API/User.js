import { API } from '../Utils/backEnd'
import axios from '../Utils/axios'

export const getUserAPI = (userId, next) => {
    axios.get(`${API}/user/${userId}`)
        .then(res => {
            const { userProfileInfo } = res.data;
            next(userProfileInfo);
        })
        .catch(err => console.log(err));
}