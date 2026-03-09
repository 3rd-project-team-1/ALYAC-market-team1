import { API_ENDPOINT, api } from '@/shared/api';

import { type FollowResponse, followResponseSchema } from '../model/user.schema';

export const follow = (accountname: string): Promise<FollowResponse> =>
  api.post(API_ENDPOINT.PROFILE_FOLLOW(accountname), {}, followResponseSchema);
