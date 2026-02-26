import { PostCard } from '@/entities/post';
import { FeedState } from '@/features/feed/model/feedState';

interface FeedListProps {
  posts: FeedState['posts'];
  myAccountname: string;
  onRewrite: (postId: string) => void;
  onDelete: (postId: string) => void;
  onClick: (postId: string) => void;
}

export function FeedList({ posts, myAccountname, onRewrite, onDelete, onClick }: FeedListProps) {
  return (
    <main className="mx-auto max-w-5xl pt-[48px]">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isMyPost={post.author.accountname === myAccountname}
          onRewrite={onRewrite}
          onDelete={onDelete}
          onClick={() => onClick(post.id)}
        />
      ))}
    </main>
  );
}
