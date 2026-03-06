import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CommentResponse } from '../types';

export const createComment = (postId: string, content: string) =>
  axiosInstance.post<CommentResponse>(API_ENDPOINT.POST_COMMENTS(postId), {
    comment: { content },
  });
