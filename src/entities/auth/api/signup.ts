import { AuthResponse, SignupRequest } from '@/entities/user';
import { axiosInstance } from '@/shared/api';

// 회원가입 API
export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user', data);
  return response.data;
};
