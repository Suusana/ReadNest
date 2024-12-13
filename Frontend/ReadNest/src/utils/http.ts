import axios from "axios";
import { getToken } from "./token";

const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

// 2 interceptors
httpInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

httpInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { httpInstance }