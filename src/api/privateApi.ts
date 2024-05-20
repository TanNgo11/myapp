
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const privateApi = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
});

privateApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;
        const originalRequest = error.config;

        if (response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const auth = useAuth();
            await auth.refreshToken();
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return privateApi(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default privateApi;
