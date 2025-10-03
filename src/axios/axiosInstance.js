// utils/axios.js
import axios from "axios";
import { useAuthStore } from "../stores/auth"; // import pinia store

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------- REQUEST INTERCEPTOR -----------------
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------- RESPONSE INTERCEPTOR -----------------
let isRefreshing = false;
let queue = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const { refresh, logout } = authStore;
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refresh(); // ✅ lấy token mới từ store

        // Giải quyết hàng đợi
        queue.forEach((p) => p.resolve(newAccessToken));
        queue = [];

        // Retry request ban đầu
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        logout();
        queue.forEach((p) => p.reject(err));
        queue = [];
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
