import { AuthResponse, SignupRequest } from '@/entities/user';
import { axiosInstance } from '@/shared/api';

import { authResponseSchema } from '../model/auth.schema';

export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user/signup', data);

  const result = authResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('회원가입 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
