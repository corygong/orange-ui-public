import config from 'config';
import { authHeader, handleResponse } from '../utils';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return localStorage.getItem('currentUser');
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}