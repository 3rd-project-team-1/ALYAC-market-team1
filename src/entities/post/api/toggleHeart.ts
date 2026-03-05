import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { PostResponse } from '../types';

export const toggleHeart = (postId: string) =>
  axiosInstance.post<PostResponse>(API_ENDPOINT.POST_HEART(postId));
