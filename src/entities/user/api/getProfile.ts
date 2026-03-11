import { API_ENDPOINT, api } from '@/shared/api';

import { type GetProfileResponse, getProfileResponseSchema } from '../model/user.schema';

/**
 * 프로필 조회 API
 * @param accountname - 조회할 사용자 계정 ID
 * @returns 사용자 프로필 정보
 * @example
 * ```ts
 * const { profile } = await getProfile('hong123');
 * ```
 */
export const getProfile = (accountname: string): Promise<GetProfileResponse> =>
  api.get(API_ENDPOINT.PROFILE(accountname), getProfileResponseSchema);
