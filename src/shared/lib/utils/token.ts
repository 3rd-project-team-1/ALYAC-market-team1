import { axiosInstance } from '@/shared/api';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// 토큰 저장
export const saveToken = (token: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// 토큰 조회
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// 토큰 삭제 (로그아웃)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

//토큰 검증
export const checkTokenValidity = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;
  try {
    const response = await axiosInstance.get('/api/user/checktoken');
    return response.data.isValid;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

// 토큰 디코딩 (사용자 정보 추출)
export const getTokenUserInfo = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    // JWT는 Base64url 인코딩 사용 → 표준 Base64로 변환 후 디코딩
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded; // { accountname, email, ... }
  } catch {
    return null;
  }
};
