import axiosInstance from '@/shared/api/axios';

import type { PostResponse } from '../types';

export const createPost = (content: string, image: string = '') =>
  axiosInstance.post<PostResponse>('/api/post', { post: { content, image } });
