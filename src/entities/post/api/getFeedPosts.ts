import axiosInstance from '@/shared/api/axios';

import type { PostsResponse } from '../types';

export const getFeedPosts = (page = 1, limit = 10) =>
  axiosInstance.get<PostsResponse>(`/api/post/feed?page=${page}&limit=${limit}`);
