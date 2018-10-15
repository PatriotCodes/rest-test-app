import {apiConstants} from '../constants';
import {authHeader} from "../helpers";

export const workerApi = {
    getAll,
    deleteByID,
    create
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(apiConstants.URL + '/workers', requestOptions).then(handleResponse);
}

function deleteByID(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(apiConstants.URL + '/workers/' + id, requestOptions).then(handleResponse);
}

function create(worker) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(worker),
    };
    return fetch(apiConstants.URL + '/workers/', requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}