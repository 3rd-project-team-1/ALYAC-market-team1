import type { SignupRequest } from '@/entities/user';
import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { type AuthResponse, authResponseSchema } from '../model/auth.schema';

export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post(API_ENDPOINT.AUTH_SIGNUP, data);

  const result = authResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('회원가입 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
