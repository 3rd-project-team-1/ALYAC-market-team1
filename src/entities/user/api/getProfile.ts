import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { getProfileResponseSchema } from '../model/user.schema';

export const getProfile = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.PROFILE(accountname));

  const result = getProfileResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getProfile 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
