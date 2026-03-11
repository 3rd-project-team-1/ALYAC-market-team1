import { API_ENDPOINT, api } from '@/shared/api';

import { type FollowResponse, followResponseSchema } from '../model/user.schema';

/**
 * 언팔로우 API
 * @param accountname - 언팔로우할 사용자 계정 ID
 * @returns 업데이트된 프로필 정보 (팔로우 상태 포함)
 * @example
 * ```ts
 * const { profile } = await unfollow('hong123');
 * ```
 */
export const unfollow = (accountname: string): Promise<FollowResponse> =>
  api.delete(API_ENDPOINT.PROFILE_UNFOLLOW(accountname), followResponseSchema);
