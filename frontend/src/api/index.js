import axios from 'axios';

const API_URL = `${process.env['REACT_APP_API_HOST']}/api`;
// const baseQuery = axios.create({
//     baseURL: API_URL,
//     responseType: 'json',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         ...authHeader(),
//     },
// });

// const API = {
//     post: (address, body) =>
//         baseQuery.post(address, body).then(({ data }) => data),
//     get: (address) => baseQuery.get(address).then(({ data }) => data),
// };

// export default API;

const baseQuery = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

baseQuery.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

baseQuery.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('token', response.data.accessToken);
                return baseQuery.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        throw error;
    }
);

const API = {
    post: (address, body) =>
        baseQuery.post(address, body).then(({ data }) => data),
    get: (address) => baseQuery.get(address).then(({ data }) => data),
};

export default API;
