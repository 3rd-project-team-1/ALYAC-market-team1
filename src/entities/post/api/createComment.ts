import axiosInstance from '@/shared/api/axios';

import type { CommentResponse } from '../types';

export const createComment = (postId: string, content: string) =>
  axiosInstance.post<CommentResponse>(`/api/post/${postId}/comments`, {
    comment: { content },
  });
