import { API_ENDPOINT, api } from '@/shared/api';

import { type GetFollowingsResponse, getFollowingsResponseSchema } from '../model/user.schema';

/**
 * 팔로잉 목록 조회 API
 * @param accountname - 사용자 계정 ID
 * @returns 팔로잉 목록
 * @example
 * ```ts
 * const { following } = await getFollowing('hong123');
 * ```
 */
export const getFollowing = (accountname: string): Promise<GetFollowingsResponse> =>
  api.get(API_ENDPOINT.PROFILE_FOLLOWINGS(accountname), getFollowingsResponseSchema);
