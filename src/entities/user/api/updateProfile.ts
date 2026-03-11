import { API_ENDPOINT, api } from '@/shared/api';

import {
  type UpdateProfileRequest,
  type UpdateProfileResponse,
  updateProfileResponseSchema,
} from '../model/user.schema';

/**
 * 프로필 수정 API
 * @param data - 수정할 프로필 정보 (username, accountname, intro, image)
 * @returns 수정된 프로필 정보
 * @example
 * ```ts
 * const { user } = await updateProfile({
 *   user: {
 *     username: '홍길동',
 *     accountname: 'hong123',
 *     intro: '안녕하세요!',
 *     image: 'https://example.com/profile.jpg',
 *   }
 * });
 * ```
 */
export const updateProfile = (data: UpdateProfileRequest): Promise<UpdateProfileResponse> =>
  api.put(API_ENDPOINT.USER_UPDATE, data, updateProfileResponseSchema);
