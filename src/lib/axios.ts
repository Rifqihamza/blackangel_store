import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
    withCredentials: true // send cookies for next-auth
});

// request interceptor example: attach token if you use bearer tokens (optional)
api.interceptors.request.use(async (config) => {
    // if you later want to attach bearer token from localStorage:
    // const token = localStorage.getItem("token");
    // if (token) config.headers!["Authorization"] = `Bearer ${token}`;
    return config;
});

export default api;
