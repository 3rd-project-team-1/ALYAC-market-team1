import { AuthResponse, LoginRequest } from '@/entities/user';
import { axiosInstance } from '@/shared/api';

import { authResponseSchema } from '../model/auth.schema';

export const signIn = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user/signin', data);

  const result = authResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('로그인 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
