import axiosInstance from '@/shared/api/axios';

import type { PostResponse } from '../types';

export const updatePost = (postId: string, content: string, image: string = '') =>
  axiosInstance.put<PostResponse>(`/api/post/${postId}`, { post: { content, image } });
