import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// (경로는 실제 프로젝트 구조에 맞게 수정해 주세요)
import { getRefreshToken, getToken, removeToken, saveToken } from '@/entities/auth/lib/token';

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
// 요청들이 성공할지 실패할지 모두 관리도록 타입 개선
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

// 갱신 성공 시: 대기 중인 요청들에게 새 토큰 전달
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(({ resolve }) => resolve(token));
  refreshSubscribers = []; // 큐 비우기
};
// 갱신 실패 시: 대기 중인 요청들을 모두 에러 처리 (무한 로딩 방지)
const onTokenRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = []; // 큐 비우기
};
// ------------------------------------------------

//  응답(Response) 인터셉터: 401 에러 처리 및 토큰 재발급 로직
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // any 대신 확장한 커스텀 타입(CustomAxiosRequestConfig) 사용
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러(인증 실패)이고, 재시도한 적이 없는 요청일 경우
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 다른 요청으로 인해 토큰 갱신 중이라면 대기열(Queue)에 등록
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(
            (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            (err) => reject(err), // 갱신 실패 시 같이 에러 던짐
          );
        });
      }

      // 토큰 갱신 작업 시작
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // Refresh Token조차 없다면 즉시 로그아웃 처리
        removeToken();
        window.location.href = '/signin';
        return Promise.reject(error);
      }

      try {
        //  Body에 refreshToken을 담아서 요청 및 중복 방지
        const response = await axios.post(
          '/api/user/refresh',
          { refreshToken },
          { baseURL: import.meta.env.VITE_API_BASE_URL },
        );

        //  응답 데이터에서  accessToken과 refreshToken을 꺼냄
        const { accessToken: newToken, refreshToken: newRefreshToken } = response.data;

        // 새 토큰들 저장
        saveToken(newToken, newRefreshToken);

        // 대기 중인 다른 요청들에 새 토큰 전달하여 실행
        onTokenRefreshed(newToken);

        // 현재 실패했던 원래 요청의 헤더를 새 토큰으로 교체하고 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //  갱신 실패 시: 대기열의 요청들을 쳐내고(reject) 로그아웃 처리
        onTokenRefreshFailed(refreshError);
        removeToken();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      } finally {
        // 성공하든 실패하든 갱신 상태 초기화
        isRefreshing = false;
      }
    }

    // 401 에러가 아니거나, 이미 재시도했던 요청은 그대로 에러 반환
    return Promise.reject(error);
  },
);

export default axiosInstance;
