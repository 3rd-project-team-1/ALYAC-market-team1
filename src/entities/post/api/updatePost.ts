import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

export const updatePost = (
  postId: string,
  content: string,
  image: string = '',
): Promise<PostResponse> =>
  api.put(API_ENDPOINT.POST_UPDATE(postId), { post: { content, image } }, postResponseSchema);
