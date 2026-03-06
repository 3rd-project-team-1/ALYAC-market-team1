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
  getProfile: async (accountname: string) => {
    const response = await axiosInstance.get(API_ENDPOINT.PROFILE(accountname));
    console.log('getProfile response:', JSON.stringify(response.data, null, 2));
    return response;
  },

  // 유저 검색 GET /api/user/searchuser/?keyword=:keyword
  searchUsers: async (keyword: string) => {
    const response = await axiosInstance.get(API_ENDPOINT.USER_SEARCH, { params: { keyword } });
    console.log('searchUsers response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  // 팔로우 POST /api/profile/:accountname/follow
  follow: (accountname: string) => axiosInstance.post(API_ENDPOINT.PROFILE_FOLLOW(accountname)),

  // 언팔로우 DELETE /api/profile/:accountname/unfollow
  unfollow: (accountname: string) =>
    axiosInstance.delete(API_ENDPOINT.PROFILE_UNFOLLOW(accountname)),

  // 팔로워 목록 GET /api/profile/:accountname/follower/
  getFollowers: async (accountname: string) => {
    const response = await axiosInstance.get(API_ENDPOINT.PROFILE_FOLLOWERS(accountname));
    console.log('getFollowers response:', JSON.stringify(response.data, null, 2));
    return response;
  },

  // 팔로잉 목록 GET /api/profile/:accountname/following/
  getFollowings: async (accountname: string) => {
    const response = await axiosInstance.get(API_ENDPOINT.PROFILE_FOLLOWINGS(accountname));
    console.log('getFollowings response:', JSON.stringify(response.data, null, 2));
    return response;
  },

  // 프로필 수정 PUT /api/user
  updateProfile: (data: {
    user: { username: string; accountname: string; intro: string; image: string };
  }) => axiosInstance.put(API_ENDPOINT.USER_UPDATE, data),
};
