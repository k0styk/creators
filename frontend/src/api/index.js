import axios from 'axios';
import authHeader from './auth/authHeader';

const API_URL = `${process.env['REACT_APP_API_HOST']}/api`;
const baseQuery = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...authHeader(),
    },
});

const API = {
    post: (address, body) =>
        baseQuery.post(address, body).then(({ data }) => data),
    get: (address) => baseQuery.get(address).then(({ data }) => data),
};

export default API;
