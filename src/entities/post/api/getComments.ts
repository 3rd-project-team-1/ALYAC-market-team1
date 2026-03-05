import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CommentsResponse } from '../types';

export const getComments = (postId: string) =>
  axiosInstance.get<CommentsResponse>(API_ENDPOINT.POST_COMMENTS(postId));
