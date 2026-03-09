import { API_ENDPOINT, api } from '@/shared/api';

import { type FollowResponse, followResponseSchema } from '../model/user.schema';

/**
 * 팔로우 API
 * @param accountname - 팔로우할 사용자 계정 ID
 * @returns 업데이트된 프로필 정보 (팔로우 상태 포함)
 * @example
 * ```ts
 * const { profile } = await follow('hong123');
 * ```
 */
export const follow = (accountname: string): Promise<FollowResponse> =>
  api.post(API_ENDPOINT.PROFILE_FOLLOW(accountname), {}, followResponseSchema);
