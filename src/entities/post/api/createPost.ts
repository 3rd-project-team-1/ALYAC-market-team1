import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

export const createPost = (content: string, image: string = ''): Promise<PostResponse> =>
  api.post(API_ENDPOINT.POST_CREATE, { post: { content, image } }, postResponseSchema);
