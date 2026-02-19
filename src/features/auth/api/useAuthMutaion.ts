import { useMutation } from '@tanstack/react-query';

import { saveToken } from '@/entities/auth/lib/token';
import { AuthResponse, LoginRequest, SignupRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

// ==========================================
// 1. 순수 API 호출 함수 (fetcher)
// ==========================================

// 회원가입 API 호출
const signupApi = async (data: SignupRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/api/user', data);
  return response.data;
};

// 로그인 API 호출
const loginApi = async (data: LoginRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/api/user/signin', data);
  return response.data;
};

// ==========================================
// 2. TanStack Query Custom Hooks
// ==========================================

/**
 * [회원가입 훅]
 * 사용법: const { mutate: signup, isPending } = useSignupMutation();
 */
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      //  회원가입 응답에도 토큰이 옴 (자동 로그인 처리)
      const { token, refreshToken } = data.user;
      saveToken(token, refreshToken);

      // TODO: 성공 알림(Toast) 띄우기 및 메인 페이지로 이동
      console.log('회원가입 성공!', data.user.username);
    },
    onError: (error) => {
      // 409(중복) 등 에러 처리
      console.error('회원가입 실패:', error);
    },
  });
};

/**
 * [로그인 훅]
 * 사용법: const { mutate: login, isPending, isError } = useLoginMutation();
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 로그인 성공 시 토큰 저장
      const { token, refreshToken } = data.user;
      saveToken(token, refreshToken);

      // TODO: 전역 상태(Zustand 등)에 유저 정보 저장 및 메인 페이지로 이동
      console.log('로그인 성공!', data.user.accountname);
    },
    onError: (error) => {
      // 401(비밀번호 틀림) 등 에러 처리
      console.error('로그인 실패:', error);
    },
  });
};
