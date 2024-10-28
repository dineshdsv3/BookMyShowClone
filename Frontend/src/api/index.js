import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/bms/',
    headers: {
        "Content-Type": "application/json",
    }
})


