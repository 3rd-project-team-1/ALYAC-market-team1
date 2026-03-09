import { API_ENDPOINT, api } from '@/shared/api';

import { type GetProfileResponse, getProfileResponseSchema } from '../model/user.schema';

export const getProfile = (accountname: string): Promise<GetProfileResponse> =>
  api.get(API_ENDPOINT.PROFILE(accountname), getProfileResponseSchema);
