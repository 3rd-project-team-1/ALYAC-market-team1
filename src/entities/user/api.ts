import { API_ENDPOINT, axiosInstance } from '@/shared/api';

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
    axiosInstance.get<GetProfileResponse>(API_ENDPOINT.PROFILE(accountname)),

  // 유저 검색 GET /api/user/searchuser/?keyword=:keyword
  searchUsers: (keyword: string) =>
    axiosInstance.get<SearchUsersResponse>(API_ENDPOINT.USER_SEARCH, {
      params: { keyword },
    }),

  // 팔로우 POST /api/profile/:accountname/follow
  follow: (accountname: string) => axiosInstance.post(API_ENDPOINT.PROFILE_FOLLOW(accountname)),

  // 언팔로우 DELETE /api/profile/:accountname/unfollow
  unfollow: (accountname: string) =>
    axiosInstance.delete(API_ENDPOINT.PROFILE_UNFOLLOW(accountname)),

  // 팔로워 목록 GET /api/profile/:accountname/follower/
  getFollowers: (accountname: string) =>
    axiosInstance.get<GetFollowersResponse>(API_ENDPOINT.PROFILE_FOLLOWERS(accountname)),

  // 팔로잉 목록 GET /api/profile/:accountname/following/
  getFollowings: (accountname: string) =>
    axiosInstance.get<GetFollowingsResponse>(API_ENDPOINT.PROFILE_FOLLOWINGS(accountname)),

  // 프로필 수정 PUT /api/user
  updateProfile: (data: {
    user: { username: string; accountname: string; intro: string; image: string };
  }) => axiosInstance.put(API_ENDPOINT.USER_UPDATE, data),
};
