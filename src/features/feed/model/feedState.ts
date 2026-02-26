import { PostCardModel } from '@/entities/post';

export type FeedState = {
  isLoading: boolean;
  posts: PostCardModel[];
};
