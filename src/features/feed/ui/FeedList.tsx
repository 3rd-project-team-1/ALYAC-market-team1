import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import type { PostCardModel } from '@/features/feed';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

import { PostCard } from './PostCard';

interface FeedListProps {
  /** 렌더링할 게시글 목록 */
  posts: PostCardModel[];
  /** 현재 로그인한 유저의 accountname (본인 게시글 판별에 사용) */
  myAccountname: string;
  /** 추가로 불러올 데이터가 있는지 여부 */
  hasMore: boolean;
  /** 다음 페이지 로딩 중 여부 (중복 요청 방지용) */
  isFetchingMore?: boolean;
  /** 다음 페이지 로드 요청 핸들러 */
  onLoadMore: () => void;
  /** 게시글 수정 페이지 이동 핸들러 */
  onRewrite: (postId: string) => void;
  /** 게시글 삭제 핸들러 */
  onDelete: (postId: string) => void;
  /** 게시글 신고 핸들러 (선택) */
  onReport?: (postId: string) => void;
  /** 게시글 카드 클릭 핸들러 (상세 페이지 이동) */
  onClick: (postId: string) => void;
  /** true이면 각 게시글 카드에 페이드인 슬라이드 애니메이션 적용 (폴백 모드에서 사용) */
  animated?: boolean;
}

/**
 * 피드 게시글 카드 목록 컴포넌트입니다.
 *
 * `react-intersection-observer`를 사용해 스크롤 기반 무한 로딩을 처리합니다.
 * 목록 하단의 sentinel 요소가 뷰포트에 진입하면 `onLoadMore`를 호출합니다.
 * `isFetchingMore`가 true일 때는 중복 요청을 방지합니다.
 *
 * 각 `PostCard`에 `isMyPost` 플래그를 전달해 본인/타인 게시글 메뉴를 분기합니다.
 */
export function FeedList({
  posts,
  myAccountname,
  hasMore,
  isFetchingMore = false,
  onLoadMore,
  onRewrite,
  onDelete,
  onClick,
  animated = false,
}: FeedListProps) {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isFetchingMore) {
      onLoadMore();
    }
  }, [inView, hasMore, isFetchingMore, onLoadMore]);

  return (
    <main className={cn('mx-auto max-w-5xl pt-[48px]')}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={cn(
            animated && 'animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500',
          )}
        >
          <PostCard
            post={post}
            // 게시글 작성자와 로그인 유저가 같으면 수정/삭제 메뉴 표시
            isMyPost={post.author.accountname === myAccountname}
            onRewrite={onRewrite}
            onDelete={onDelete}
            onClick={() => onClick(post.id)}
          />
        </div>
      ))}
      {/* 스크롤 감지용 sentinel 요소 */}
      <div ref={ref} className={cn('h-1')} />
      {isFetchingMore && (
        <div className={cn('py-6')}>
          <LoadingSpinner message="피드를 불러오는 중..." />
        </div>
      )}
    </main>
  );
}
