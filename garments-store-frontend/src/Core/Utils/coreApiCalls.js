import { API } from '../../backEnd'
import localforage from 'localforage'
// https://localforage.github.io/localForage/#installation

const getUser = () => {
    console.log(`getuser method called`);
    localforage.getItem("userInfo")
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(data => data);
}



export { getUser };
