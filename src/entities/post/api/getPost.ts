import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { PostResponse } from '../types';

export const getPost = (postId: string) =>
  axiosInstance.get<PostResponse>(API_ENDPOINT.POST_GET(postId));
