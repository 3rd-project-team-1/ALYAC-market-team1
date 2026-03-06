import type { LoginRequest } from '@/entities/user';
import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { type AuthResponse, authResponseSchema } from '../model/auth.schema';

export const signIn = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post(API_ENDPOINT.AUTH_SIGNIN, data);

  const result = authResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('로그인 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
