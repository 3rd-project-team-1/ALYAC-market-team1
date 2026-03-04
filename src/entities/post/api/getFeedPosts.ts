import axiosInstance from '@/shared/api/axios';

import type { FeedPostsResponse } from '../types';

export const getFeedPosts = (skip = 0, limit = 10) =>
  axiosInstance.get<FeedPostsResponse>(`/api/post/feed?skip=${skip}&limit=${limit}`);
