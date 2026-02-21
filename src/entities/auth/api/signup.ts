import { AuthResponse, SignupRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user', data);
  return response.data;
};
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/user/emailvalid', { user: { email } });
  return !response.data.ok;
};
