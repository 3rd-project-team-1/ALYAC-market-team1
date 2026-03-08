import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

export const toggleHeart = (postId: string): Promise<PostResponse> =>
  api.post(API_ENDPOINT.POST_HEART(postId), {}, postResponseSchema);
