import axiosInstance from '@/shared/api/axios';

import type { PostResponse } from '../types';

export const toggleHeart = (postId: string) =>
  axiosInstance.post<PostResponse>(`/api/post/${postId}/heart`);
