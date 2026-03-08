import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentResponse, commentResponseSchema } from '../model/post.schema';

export const deleteComment = (postId: string, commentId: string): Promise<CommentResponse> =>
  api.delete(API_ENDPOINT.POST_COMMENT_DELETE(postId, commentId), commentResponseSchema);
