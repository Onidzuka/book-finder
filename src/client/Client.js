import * as constants from "../constants/Constants"

const axios = require('axios');

const instance = axios.create({
    baseURL: constants.API_ENDPOINT,
    timeout: 1000
});

function searchBooks(query, success) {
    let path = `/volumes?q=${query}&key=${constants.API_KEY}`;

    instance.get(path)
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

const Client = { searchBooks };
export default Client;
