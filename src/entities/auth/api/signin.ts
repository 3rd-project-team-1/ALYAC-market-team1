import { AuthResponse, LoginRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

export const signIn = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/user/login', data);
  return response.data;
};
