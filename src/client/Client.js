import * as constants from "../constants/Constants"

function searchBooks(query, success) {
    let queryString = `volumes?q=${query}&key=${constants.API_KEY}`;
    let booksEndpoint = constants.API_ENDPOINT + queryString;

    return fetch(booksEndpoint)
        .then(checkStatus)
        .then(parseJSON)
        .then(success)
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

const Client = { searchBooks };
export default Client;
