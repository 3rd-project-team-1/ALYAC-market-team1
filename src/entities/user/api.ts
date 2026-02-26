import axiosInstance from '@/shared/api/axios';

import type { Profile } from './types';

export interface GetProfileResponse {
  profile: Profile;
}

export type SearchUsersResponse = Profile[];

export interface GetFollowersResponse {
  follower: Profile[];
}

export interface GetFollowingsResponse {
  following: Profile[];
}

export const userApi = {
  // 프로필 조회 GET /api/profile/:accountname
  getProfile: (accountname: string) =>
    axiosInstance.get<GetProfileResponse>(`/api/profile/${accountname}`),

  // 유저 검색 GET /api/user/searchuser/?keyword=:keyword
  searchUsers: (keyword: string) =>
    axiosInstance.get<SearchUsersResponse>('/api/user/searchuser', {
      params: { keyword },
    }),

  // 팔로우 POST /api/profile/:accountname/follow
  follow: (accountname: string) => axiosInstance.post(`/api/profile/${accountname}/follow`),

  // 언팔로우 DELETE /api/profile/:accountname/unfollow
  unfollow: (accountname: string) => axiosInstance.delete(`/api/profile/${accountname}/unfollow`),

  // 팔로워 목록 GET /api/profile/:accountname/follower/
  getFollowers: (accountname: string) =>
    axiosInstance.get<GetFollowersResponse>(`/api/profile/${accountname}/follower/`),

  // 팔로잉 목록 GET /api/profile/:accountname/following/
  getFollowings: (accountname: string) =>
    axiosInstance.get<GetFollowingsResponse>(`/api/profile/${accountname}/following/`),

  // 프로필 수정 PUT /api/user
  updateProfile: (data: {
    user: { username: string; accountname: string; intro: string; image: string };
  }) => axiosInstance.put('/api/user', data),
};
