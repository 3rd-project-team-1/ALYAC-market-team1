import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { PostsResponse } from '../types';

export const getUserPosts = (accountname: string) =>
  axiosInstance.get<PostsResponse>(API_ENDPOINT.POST_USER(accountname));
