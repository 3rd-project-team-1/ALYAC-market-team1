import { useState } from 'react';

import UserAvatar from '@/shared/ui/userAvatar';

interface PostCardAuthor {
  username: string;
  accountname: string;
  image?: string;
}

export interface PostCardModel {
  id: string;
  content: string;
  image?: string;
  heartCount: number;
  commentCount: number;
  author: PostCardAuthor;
}

interface PostCardProps {
  post: PostCardModel;
  isMyPost?: boolean;
  onRewrite?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, isMyPost = false, onRewrite, onDelete }: PostCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRewrite = () => {
    onRewrite?.(post.id);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(post.id);
    setIsMenuOpen(false);
  };

  return (
    <article className="border-border relative border-b px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <UserAvatar src={post.author.image} username={post.author.username} />
          <div>
            <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
            <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
          </div>
        </div>

        {isMyPost && (
          <div className="relative">
            <button
              type="button"
              aria-label="게시글 메뉴"
              className="text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </button>

            {isMenuOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  aria-label="메뉴 닫기"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="bg-background border-border absolute top-9 right-0 z-20 w-28 overflow-hidden rounded-md border py-1 shadow-sm">
                  <button
                    type="button"
                    className="hover:bg-accent text-foreground w-full px-3 py-2 text-left text-sm"
                    onClick={handleRewrite}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="hover:bg-accent text-destructive w-full px-3 py-2 text-left text-sm"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="게시글 이미지"
          className="border-border mt-3 w-full rounded-lg border object-cover"
        />
      )}

      <p className="text-muted-foreground mt-3 text-xs">
        좋아요 {post.heartCount} · 댓글 {post.commentCount}
      </p>
    </article>
  );
}
