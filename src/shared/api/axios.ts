import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { getRefreshToken, getToken, removeToken, saveToken } from '@/shared/lib';

import { API_ENDPOINT } from './constants/endpoints';

// 타입을 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//  기본 Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

//  요청(Request) 인터셉터: API 호출 전에 토큰을 헤더에 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- 토큰 갱신 동시성 제어를 위한 변수 및 함수 ---
let isRefreshing = false;
type RefreshSubscriber = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};
let refreshSubscribers: RefreshSubscriber[] = [];

const subscribeTokenRefresh = (
  resolve: (token: string) => void,
  reject: (err: unknown) => void,
) => {
  refreshSubscribers.push({ resolve, reject });
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(({ resolve }) => resolve(token));
  refreshSubscribers = [];
};

const onTokenRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = [];
};

//  응답(Response) 인터셉터: 401 에러 처리 및 토큰 재발급 로직
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(API_ENDPOINT.AUTH_REFRESH)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(
            (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            (err) => reject(err),
          );
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      try {
        if (!refreshToken) {
          throw new Error('No refresh token');
        }
        const response = await axios.post(
          API_ENDPOINT.AUTH_REFRESH,
          { refreshToken },
          { baseURL: import.meta.env.VITE_API_BASE_URL },
        );

        const { accessToken: newToken, refreshToken: newRefreshToken } = response.data;

        saveToken(newToken, newRefreshToken);
        onTokenRefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        onTokenRefreshFailed(refreshError);
        removeToken();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
