import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { searchUsersResponseSchema } from '../model/user.schema';

export const searchUsers = async (keyword: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.USER_SEARCH, {
    params: { keyword },
  });

  const result = searchUsersResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('searchUsers 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
