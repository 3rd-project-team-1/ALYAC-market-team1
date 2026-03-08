import { API_ENDPOINT, api } from '@/shared/api';

import { type FeedPostsResponse, feedPostsResponseSchema } from '../model/post.schema';

export const getFeedPosts = (skip = 0, limit = 10): Promise<FeedPostsResponse> =>
  api.get(API_ENDPOINT.POST_FEED(skip, limit), feedPostsResponseSchema);
