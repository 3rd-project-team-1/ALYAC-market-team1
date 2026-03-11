import { API_ENDPOINT, api } from '@/shared/api';

import { type GetFollowersResponse, getFollowersResponseSchema } from '../model/user.schema';

/**
 * 팔로워 목록 조회 API
 * @param accountname - 사용자 계정 ID
 * @returns 팔로워 목록
 * @example
 * ```ts
 * const { follower } = await getFollowers('hong123');
 * ```
 */
export const getFollowers = (accountname: string): Promise<GetFollowersResponse> =>
  api.get(API_ENDPOINT.PROFILE_FOLLOWERS(accountname), getFollowersResponseSchema);
