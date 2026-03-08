import { API_ENDPOINT, api } from '@/shared/api';

import { type SearchUsersResponse, searchUsersResponseSchema } from '../model/user.schema';

export const searchUsers = (keyword: string): Promise<SearchUsersResponse> =>
  api.get(API_ENDPOINT.USER_SEARCH, searchUsersResponseSchema, { keyword });
