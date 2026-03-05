import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { PostResponse } from '../types';

export const updatePost = (postId: string, content: string, image: string = '') =>
  axiosInstance.put<PostResponse>(API_ENDPOINT.POST_UPDATE(postId), { post: { content, image } });
