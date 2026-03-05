import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { PostResponse } from '../types';

export const createPost = (content: string, image: string = '') =>
  axiosInstance.post<PostResponse>(API_ENDPOINT.POST_CREATE, { post: { content, image } });
