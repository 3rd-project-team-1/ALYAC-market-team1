import { AuthResponse, SignupRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

// 회원가입 API
export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user', data);
  return response.data;
};
// 이메일 중복 체크 API
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/user/emailvalid', { user: { email } });
  return !response.data.ok;
};
// 계정 ID 중복 체크 API
export const checkAccountnameDuplicate = async (accountname: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/user/accountnamevalid', {
    user: { accountname },
  });
  return !response.data.ok;
};
// 프로필 이미지 업로드 API
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('/api/image/uploadfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.path;
};
