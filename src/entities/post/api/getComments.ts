import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentsResponse, commentsResponseSchema } from '../model/post.schema';

export const getComments = (postId: string): Promise<CommentsResponse> =>
  api.get(API_ENDPOINT.POST_COMMENTS(postId), commentsResponseSchema);
