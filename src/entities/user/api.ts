import axiosInstance from '@/shared/api/axios';

import type { Profile } from './types';

export interface ProfileResponse {
  profile: Profile;
}

export const userApi = {
  // 프로필 조회 GET /api/profile/:accountname
  getProfile: (accountname: string) =>
    axiosInstance.get<ProfileResponse>(`/api/profile/${accountname}`),

  // 팔로우 POST /api/profile/:accountname/follow
  follow: (accountname: string) => axiosInstance.post(`/api/profile/${accountname}/follow`),

  // 언팔로우 DELETE /api/profile/:accountname/unfollow
  unfollow: (accountname: string) => axiosInstance.delete(`/api/profile/${accountname}/unfollow`),
};
