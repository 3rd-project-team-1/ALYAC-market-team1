import { API_ENDPOINT, api } from '@/shared/api';

import { type GetFollowingsResponse, getFollowingsResponseSchema } from '../model/user.schema';

export const getFollowings = (accountname: string): Promise<GetFollowingsResponse> =>
  api.get(API_ENDPOINT.PROFILE_FOLLOWINGS(accountname), getFollowingsResponseSchema);
