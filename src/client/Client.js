function get(url, success) {
    return fetch(url)
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

const Client = { get };
export default Client;
