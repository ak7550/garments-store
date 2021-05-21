import axios from "axios"

export const getRandomImages = (tag="fashion", next) => {
    fetch(`https://source.unsplash.com/featured/?${tag}`)
        .then(res => {
            console.log(res);
            next(res.url);
        })
        .catch(err => console.log(err));
}
