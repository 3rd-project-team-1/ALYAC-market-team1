import InfiniteScroll from 'react-infinite-scroller';

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
}

/**
 * 피드 게시글 카드 목록 컴포넌트입니다.
 *
 * `react-infinite-scroller`를 사용해 스크롤 기반 무한 로딩을 처리합니다.
 * `isFetchingMore`가 true일 때는 `hasMore`를 false로 전달하여 중복 요청을 방지합니다.
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
  onReport,
  onClick,
}: FeedListProps) {
  return (
    <main className={cn('mx-auto max-w-5xl pt-[48px]')}>
      {/* isFetchingMore 중에는 hasMore를 false로 전달하여 연속 호출 방지 */}
      <InfiniteScroll
        loadMore={onLoadMore}
        hasMore={hasMore && !isFetchingMore}
        loader={
          <div key="loader" className={cn('py-6')}>
            <LoadingSpinner message="피드를 불러오는 중..." />
          </div>
        }
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            // 게시글 작성자와 로그인 유저가 같으면 수정/삭제 메뉴 표시
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
