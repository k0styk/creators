import axios from 'axios';
// import authHeader from './authHeader';

// const API_URL = `${process.env['REACT_APP_API_HOST']}/auth`;
// const baseQuery = axios.create({
//     baseURL: API_URL,
//     responseType: 'json',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//         Accept: 'application/json',
//         ...authHeader(),
//     },
// });

const API_URL = `${process.env['REACT_APP_API_HOST']}/auth`;

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

export default new (class AuthService {
  login({ email, password }) {
    return baseQuery
      .post('/login', { email, password })
      .then(({ data }) => data);
  }

  register({ email, password, roleTypeId }) {
    return baseQuery
      .post('/register', { email, password, roleTypeId })
      .then(({ data }) => data);
  }

  logout() {
    return baseQuery.post('/logout', {}).then(({ data }) => data);
  }

  getCurrentUser() {
    return baseQuery.get('/getCurrentUser').then(({ data }) => data);
  }
})();
