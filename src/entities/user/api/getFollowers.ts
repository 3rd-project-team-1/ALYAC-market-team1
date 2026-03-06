import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { getFollowersResponseSchema } from '../model/user.schema';

export const getFollowers = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.PROFILE_FOLLOWERS(accountname));

  const result = getFollowersResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getFollowers 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
