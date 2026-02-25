import { AuthResponse, SignupRequest } from '@/entities/user/types';
import axiosInstance from '@/shared/api/axios';

// 회원가입 API
export const signUp = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/api/user', data);
  return response.data;
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
