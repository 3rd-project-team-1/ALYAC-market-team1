import InfiniteScroll from 'react-infinite-scroller';

import type { PostCardModel } from '@/entities/feed';
import { cn } from '@/shared/lib';

import { PostCard } from './PostCard';

interface FeedListProps {
  posts: PostCardModel[];
  myAccountname: string;
  hasMore: boolean;
  onLoadMore: () => void;
  onRewrite: (postId: string) => void;
  onDelete: (postId: string) => void;
  onReport?: (postId: string) => void;
  onClick: (postId: string) => void;
}

export function FeedList({
  posts,
  myAccountname,
  hasMore,
  onLoadMore,
  onRewrite,
  onDelete,
  onReport,
  onClick,
}: FeedListProps) {
  return (
    <main className={cn('mx-auto max-w-5xl pt-[48px]')}>
      <InfiniteScroll
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={
          <div key="loader" className={cn('p-4 text-center text-sm text-gray-400')}>
            불러오는 중...
          </div>
        }
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isMyPost={post.author.accountname === myAccountname}
            onRewrite={onRewrite}
            onDelete={onDelete}
            onReport={onReport}
            onClick={() => onClick(post.id)}
          />
        ))}
      </InfiniteScroll>
    </main>
  );
}
