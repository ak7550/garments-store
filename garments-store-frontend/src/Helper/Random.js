import axios from "axios"

export const imgeAPI = process.env.REACT_APP_IMAGE_API;

export const getRandomImages = (tag = "fashion", next) => {
    fetch(`https://source.unsplash.com/featured/?${tag}`)
        .then(res => {
            console.log(res);
            next(res.url);
        })
        .catch(err => console.log(err));
}

export const getImage = async (tag = "fashion") =>
    await fetch(`https://source.unsplash.com/featured/?${tag}`);