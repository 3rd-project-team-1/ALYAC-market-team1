import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentResponse, commentResponseSchema } from '../model/post.schema';

export const createComment = (postId: string, content: string): Promise<CommentResponse> =>
  api.post(API_ENDPOINT.POST_COMMENTS(postId), { comment: { content } }, commentResponseSchema);
