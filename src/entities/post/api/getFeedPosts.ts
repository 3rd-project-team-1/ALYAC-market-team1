import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { FeedPostsResponse } from '../types';

export const getFeedPosts = (skip = 0, limit = 10) =>
  axiosInstance.get<FeedPostsResponse>(API_ENDPOINT.POST_FEED(skip, limit));
