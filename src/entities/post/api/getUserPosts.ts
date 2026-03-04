import axiosInstance from '@/shared/api/axios';

import type { PostsResponse } from '../types';

export const getUserPosts = (accountname: string) =>
  axiosInstance.get<PostsResponse>(`/api/post/${accountname}/userpost`);
