import axios from "axios";

// Create an Axios instance

const axiosInstance = axios.create({
    baseURL: "/api/v1/",
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor to Add Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Retrieve token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
