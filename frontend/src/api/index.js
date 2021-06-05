import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3003/api/",
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
       // authorization: `Bearer ${localStorage.token}`
    }
})
