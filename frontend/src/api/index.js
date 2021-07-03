import axios from "axios";

const baseQuery = axios.create({
    baseURL: 'http://localhost:3003/api/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // authorization: `Bearer ${localStorage.token}`
    }
})

const API = {
    post: (address, body) => baseQuery.post(address, body).then(({data}) => data),
    get: (address) => baseQuery.get(address).then(({data}) => data)
}

export default API;
