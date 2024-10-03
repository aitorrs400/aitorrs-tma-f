import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4000/api',
    timeout: 1000,
    headers: {
    }
});
