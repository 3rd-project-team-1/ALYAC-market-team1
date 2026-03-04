import axiosInstance from '@/shared/api/axios';

import type { CommentsResponse } from '../types';

export const getComments = (postId: string) =>
  axiosInstance.get<CommentsResponse>(`/api/post/${postId}/comments`);
