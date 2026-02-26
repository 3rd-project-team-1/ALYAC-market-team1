import { PostCardModel } from '@/entities/feed/ui/PostCard';

export type FeedState = {
  isLoading: boolean;
  posts: PostCardModel[];
};
