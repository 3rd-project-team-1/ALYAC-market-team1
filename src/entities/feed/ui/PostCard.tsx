import { useState } from 'react';

import { ChatIcon } from '@/shared/assets/svg-props';
import { HeartIcon } from '@/shared/assets/svg-props';
import { MoreIcon } from '@/shared/assets/svg-props';
import UserAvatar from '@/shared/ui/userAvatar';

// 포스트 작성자의 기본 정보 인터페이스
interface PostCardAuthor {
  username: string;
  accountname: string;
  image?: string;
}

// 포스트 카드에서 사용하는 데이터 모델
export interface PostCardModel {
  id: string;
  content: string;
  image?: string;
  heartCount: number;
  commentCount: number;
  author: PostCardAuthor;
}

// PostCard 컴포넌트의 Props
interface PostCardProps {
  post: PostCardModel;
  isMyPost?: boolean;
  isYourPost?: boolean;
  onRewrite?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onClick?: () => void;
}

/**
 * 포스트 정보를 카드 형태로 렌더링하는 컴포넌트입니다.
 *
 * @param props - PostCardProps
 * @param props.post - 포스트 데이터 상세
 * @param props.isMyPost - 본인 게시글 여부 (수정/삭제 메뉴 표시여부 결정)
 * @param props.isYourPost - 다른 사용자의 게시글 여부 (신고 메뉴 표시여부 결정)
 * @param props.onRewrite - 수정 핸들러
 * @param props.onDelete - 삭제 핸들러
 * @param props.onClick - 카드 클릭 시 상세 이동 등의 핸들러
 * @returns 게시글 카드 엘리먼트
 * @file entities/post/ui/PostCard.tsx
 */
export function PostCard({
  post,
  isMyPost = false,
  isYourPost = true,
  onRewrite,
  onDelete,
  onClick,
}: PostCardProps) {
  // 수정/삭제 메뉴 드롭다운 열림 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 수정 핸들러: 이벤트 전파를 막고 props의 onRewrite를 호출합니다.
  const handleRewrite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRewrite?.(post.id);
    setIsMenuOpen(false);
  };

  // 삭제 핸들러: 이벤트 전파를 막고 props의 onDelete를 호출합니다.
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(post.id);
    setIsMenuOpen(false);
  };

  // 신고 핸들러: 이벤트 전파를 막고 props의 onDelete를 호출합니다.
  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(post.id);
    setIsMenuOpen(false);
  };

  // 메뉴 열기/닫기 처리: 이벤트 전파를 막아 부모의 onClick(상세 이동) 이벤트를 방지합니다.
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  // 이미지 경로 처리 함수
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath || imagePath.trim() === '') return undefined;
    if (imagePath.startsWith('http')) return imagePath;
    // 환경변수에서 이미지 서버 주소를 가져오고, 없으면 localhost fallback
    const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:3000';
    return `${baseUrl.replace(/\/$/, '')}/${imagePath.replace(/^\/+/, '')}`;
  };

  // 좋아요 상태 관리 (TODO: 리팩토링 이후 세윤님 post에 있는 좋아요와 연동)
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article
      className="border-border relative cursor-pointer border-b px-4 py-4 hover:bg-gray-50/50"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        {/* 작성자 프로필 영역 */}
        <div className="flex items-start gap-3">
          <UserAvatar src={post.author.image} username={post.author.username} />
          <div>
            <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
            <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
          </div>
        </div>

        {/* 더보기 버튼 및 드롭다운 (본인 게시글일 경우만 표시) */}
        {isMyPost && (
          <div className="relative">
            <button
              type="button"
              aria-label="게시글 메뉴"
              className="text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md"
              onClick={handleMenuToggle}
            >
              <MoreIcon className="h-4 w-4" aria-label="더보기" />
            </button>

            {isMenuOpen && (
              <>
                {/* 배경 클릭 시 드롭다운 닫기 오버레이 */}
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  aria-label="메뉴 닫기"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
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
        {/* 다른 사용자의 게시글일 경우 신고 메뉴 표시 */}
        {isYourPost && (
          <div className="relative">
            <button
              type="button"
              aria-label="게시글 메뉴"
              className="text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md"
              onClick={handleMenuToggle}
            >
              <MoreIcon className="h-4 w-4" aria-label="더보기" />
            </button>
            {isMenuOpen && (
              <>
                {/* 배경 클릭 시 드롭다운 닫기 오버레이 */}
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  aria-label="메뉴 닫기"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                />
                <div className="bg-background border-border absolute top-9 right-0 z-20 w-28 overflow-hidden rounded-md border py-1 shadow-sm">
                  <button
                    type="button"
                    className="hover:bg-accent text-foreground w-full px-3 py-2 text-left text-sm"
                    onClick={handleReport}
                  >
                    신고
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 게시글 본문 내용 */}
      <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{post.content}</p>

      {/* 이미지 영역 (빈 문자열이 아닌 경우만 표시) */}
      {post.image && post.image.trim() !== '' && (
        <img
          src={getImageUrl(post.image)}
          alt="게시글 이미지"
          className="border-border mt-3 w-full rounded-lg border object-cover"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.src = '/default-image.png';
              e.currentTarget.dataset.fallback = 'true';
            }
          }}
        />
      )}

      {/* 좋아요 및 댓글 수 통계 
      TODO: 세윤님 리팩토링 이후 하트랑 댓글 아이콘 공유 
      제대로 동작 안하는게 정상*/}
      <p className="text-muted-foreground mt-3 text-xs">
        <button onClick={() => setIsLiked((prev) => !prev)}>
          <HeartIcon
            className={`mr-1 inline-block h-4 w-4 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
          />
        </button>
        {post.heartCount} <ChatIcon active={false} /> {post.commentCount}
      </p>
    </article>
  );
}
