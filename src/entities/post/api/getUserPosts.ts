import { API_ENDPOINT, api } from '@/shared/api';

import { type PostsResponse, postsResponseSchema } from '../model/post.schema';

export const getUserPosts = (accountname: string): Promise<PostsResponse> =>
  api.get(API_ENDPOINT.POST_USER(accountname), postsResponseSchema);
