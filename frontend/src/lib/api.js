import axios from "axios";
import {
  clearStoredTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  notifyForcedLogout,
  setStoredTokens,
} from "./authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const refreshToken = getStoredRefreshToken();
    const isRefreshRequest = originalRequest?.url?.includes("/api/auth/refresh/");
    const isAuthRequest =
      originalRequest?.url?.includes("/api/users/login/") ||
      originalRequest?.url?.includes("/api/users/register/");

    if (
      status !== 401 ||
      !refreshToken ||
      isRefreshRequest ||
      isAuthRequest ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios.post(
          `${api.defaults.baseURL}/api/auth/refresh/`,
          { refresh: refreshToken },
        );
      }

      const refreshResponse = await refreshPromise;
      refreshPromise = null;

      const newAccessToken = refreshResponse.data.access;
      setStoredTokens(newAccessToken, refreshToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;
      clearStoredTokens();
      notifyForcedLogout();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
