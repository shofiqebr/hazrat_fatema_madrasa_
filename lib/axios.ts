import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://product-management-iota-nine.vercel.app//api",
  withCredentials: true, // if you use cookies/auth
});

export default axiosInstance;
