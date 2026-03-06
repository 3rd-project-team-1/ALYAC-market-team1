import type { RefObject } from 'react';

import type { PostCardModel } from '@/entities/feed';
import { cn } from '@/shared/lib';

import { PostCard } from './PostCard';

interface FeedListProps {
  posts: PostCardModel[];
  myAccountname: string;
  onRewrite: (postId: string) => void;
  onDelete: (postId: string) => void;
  onClick: (postId: string) => void;
  lastCardRef?: RefObject<HTMLDivElement | null>;
}

export function FeedList({
  posts,
  myAccountname,
  onRewrite,
  onDelete,
  onClick,
  lastCardRef,
}: FeedListProps) {
  return (
    <main className={cn('mx-auto max-w-5xl pt-[48px]')}>
      {posts.map((post, index) => (
        <div key={post.id} ref={index === posts.length - 1 ? lastCardRef : undefined}>
          <PostCard
            post={post}
            isMyPost={post.author.accountname === myAccountname}
            onRewrite={onRewrite}
            onDelete={onDelete}
            onClick={() => onClick(post.id)}
          />
        </div>
      ))}
    </main>
  );
}
