import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

export const getPost = (postId: string): Promise<PostResponse> =>
  api.get(API_ENDPOINT.POST_GET(postId), postResponseSchema);
