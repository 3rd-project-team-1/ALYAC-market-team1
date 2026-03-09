import { API_ENDPOINT, api } from '@/shared/api';

import {
  type UpdateProfileRequest,
  type UpdateProfileResponse,
  updateProfileResponseSchema,
} from '../model/user.schema';

export const updateProfile = (data: UpdateProfileRequest): Promise<UpdateProfileResponse> =>
  api.put(API_ENDPOINT.USER_UPDATE, data, updateProfileResponseSchema);
