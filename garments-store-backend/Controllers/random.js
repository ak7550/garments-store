// import { format } from "morgan";

const smallletters = "qwertyuiopasdfghjklzxcvbnm", specialSymbols = "~!@#$%^&*()_+`={}[]<>,.?/|";
const numbers = "1234567890", capitalLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

exports.getString = (length, characters = (smallletters + capitalLetters + numbers)) => {
    let result = "";
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.getSize = (arr = ["M", "S", "L", "XL", "XXL"]) => arr[Math.floor(Math.random() * arr.length)];