import { AuthResponse, LoginRequest } from '@/entities/user';
import { axiosInstance } from '@/shared/api';

export const signIn = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user/signin', data);
  return response.data;
};
