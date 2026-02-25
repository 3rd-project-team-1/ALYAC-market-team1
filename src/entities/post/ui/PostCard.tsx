import { useState } from 'react';

import UserAvatar from '@/shared/ui/userAvatar';

/**
 * 포스트 작성자 정보 인터페이스
 */
interface PostCardAuthor {
  username: string;
  accountname: string;
  image?: string;
}

/**
 * 포스트 카드 데이터 모델 인터페이스
 */
export interface PostCardModel {
  id: string;
  content: string;
  image?: string;
  heartCount: number;
  commentCount: number;
  author: PostCardAuthor;
}

/**
 * PostCard 컴포넌트 Props 인터페이스
 */
interface PostCardProps {
  post: PostCardModel;
  isMyPost?: boolean; // 본인 게시글 여부 (수정/삭제 메뉴 표시 결정)
  onRewrite?: (postId: string) => void; // 수정 버튼 클릭 핸들러
  onDelete?: (postId: string) => void; // 삭제 버튼 클릭 핸들러
}

/**
 * 포스트 정보를 카드 형태로 보여주는 컴포넌트
 */
export function PostCard({ post, isMyPost = false, onRewrite, onDelete }: PostCardProps) {
  // 수정/삭제 메뉴 열림 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 게시글 수정 핸들러
  const handleRewrite = () => {
    onRewrite?.(post.id);
    setIsMenuOpen(false);
  };

  // 게시글 삭제 핸들러
  const handleDelete = () => {
    onDelete?.(post.id);
    setIsMenuOpen(false);
  };

  return (
    <article className="border-border relative border-b px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        {/* 상단: 작성자 프로필 정보 */}
        <div className="flex items-start gap-3">
          <UserAvatar src={post.author.image} username={post.author.username} />
          <div>
            <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
            <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
          </div>
        </div>

        {/* 본인 게시글일 경우 수정/삭제 메뉴 표시 */}
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
                {/* 배경 클릭 시 메뉴 닫기용 오버레이 */}
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  aria-label="메뉴 닫기"
                  onClick={() => setIsMenuOpen(false)}
                />
                {/* 드롭다운 메뉴 */}
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

      {/* 게시글 본문 내용 */}
      <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{post.content}</p>

      {/* 게시글 이미지가 있을 경우에만 렌더링 */}
      {post.image && (
        <img
          src={post.image}
          alt="게시글 이미지"
          className="border-border mt-3 w-full rounded-lg border object-cover"
        />
      )}

      {/* 하단: 통계 정보 (좋아요, 댓글 수) */}
      <p className="text-muted-foreground mt-3 text-xs">
        좋아요 {post.heartCount} · 댓글 {post.commentCount}
      </p>
    </article>
  );
}
