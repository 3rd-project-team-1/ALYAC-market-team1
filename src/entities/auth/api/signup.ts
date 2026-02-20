import { AuthResponse, SignupRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

export const useSignUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/user', data);
  return response.data;
};
