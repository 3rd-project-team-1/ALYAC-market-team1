import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

export const deletePost = (postId: string): Promise<PostResponse> =>
  api.delete(API_ENDPOINT.POST_DELETE(postId), postResponseSchema);
