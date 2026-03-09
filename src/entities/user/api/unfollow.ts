import { API_ENDPOINT, api } from '@/shared/api';

import { type FollowResponse, followResponseSchema } from '../model/user.schema';

export const unfollow = (accountname: string): Promise<FollowResponse> =>
  api.delete(API_ENDPOINT.PROFILE_UNFOLLOW(accountname), followResponseSchema);
