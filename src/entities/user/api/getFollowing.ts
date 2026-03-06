import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { getFollowingsResponseSchema } from '../model/user.schema';

export const getFollowing = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.PROFILE_FOLLOWINGS(accountname));

  const result = getFollowingsResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getFollowing 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
