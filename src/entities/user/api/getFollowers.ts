import { API_ENDPOINT, api } from '@/shared/api';

import { type GetFollowersResponse, getFollowersResponseSchema } from '../model/user.schema';

export const getFollowers = (accountname: string): Promise<GetFollowersResponse> =>
  api.get(API_ENDPOINT.PROFILE_FOLLOWERS(accountname), getFollowersResponseSchema);
