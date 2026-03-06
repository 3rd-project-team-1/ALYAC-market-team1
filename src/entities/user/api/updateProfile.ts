import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { updateProfileResponseSchema } from '../model/user.schema';

export const updateProfile = async (data: {
  user: { username: string; accountname: string; intro: string; image: string };
}) => {
  const response = await axiosInstance.put(API_ENDPOINT.USER_UPDATE, data);

  const result = updateProfileResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('updateProfile 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
