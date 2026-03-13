import { FeedEmpty, FeedErrorBanner, FeedList, useFeedPage } from '@/features/feed';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { TopMainNav } from '@/widgets/top-main-nav';

/**
 * 피드 페이지 컴포넌트입니다.
 *
 * 팔로우한 유저들의 게시글을 무한 스크롤로 제공합니다.
 * - 비즈니스 로직: `useFeedPage` 훅으로 위임
 * - 게시글 있음: `FeedList` (무한 스크롤 목록)
 * - 게시글 없음: `FeedEmpty` (검색 유도 화면)
 */
export function FeedPage() {
  const {
    myAccountname,
    isLoading,
    hasFetchedOnce,
    isFetchingMore,
    isError,
    hasMore,
    loadMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch,
    retryFeed,
    isFallbackFetching,
    isFallbackDone,
  } = useFeedPage();

  const shouldShowFallbackBanner =
    isError && (isFallbackFetching || (isFallbackDone && posts.length === 0));

  // 진짜 첫 진입에서만 전체 화면 스피너를 사용하고, 이후 재시도/폴백 중에는 페이지를 유지
  if (isLoading && !hasFetchedOnce) {
    return <LoadingSpinner fullScreen message="피드를 불러오는 중입니다..." />;
  }

  return (
    <>
      <TopMainNav title="알약마켓 피드" />
      {/*pb-[60px]: 하단 탭메뉴 높이만큼 패딩 */}
      <div className={cn('pb-[60px]')}>
        {/* 오류 발생 시 1개씩 불러오기 안내 배너 */}
        {shouldShowFallbackBanner && (
          <FeedErrorBanner
            isFallbackDone={isFallbackDone}
            hasNoPosts={posts.length === 0}
            onRetry={retryFeed}
          />
        )}

        {posts.length > 0 ? (
          <FeedList
            posts={posts}
            myAccountname={myAccountname}
            // 폴백 모드에서는 내부에서 자동 로딩하므로 무한 스크롤 비활성화
            hasMore={isError ? false : hasMore}
            isFetchingMore={isError ? isFallbackFetching : isFetchingMore}
            onLoadMore={loadMore}
            onRewrite={handleRewritePost}
            onDelete={deletePost}
            onClick={handlePostClick}
            // 폴백 모드에서는 게시글마다 페이드인 슬라이드 애니메이션 적용
            animated={isError}
            // 배너가 이미 네비 오프셋을 담당하므로 상단 패딩 최소화
            className={isError ? 'pt-3' : undefined}
          />
        ) : isError && isFallbackDone && !isFallbackFetching ? (
          /* 폴백도 완료됐는데 게시글이 없는 경우 — 오류 배너만 노출 */
          <div className={cn('mx-auto flex max-w-5xl flex-col items-center justify-center py-20')}>
            <p className={cn('text-sm text-gray-400')}>불러올 수 있는 게시글이 없습니다.</p>
          </div>
        ) : isError ? (
          /* 폴백 첫 번째 게시글 로딩 대기 중 */
          <div className={cn('pt-[60px]')}>
            <LoadingSpinner message="게시글을 하나씩 불러오는 중..." />
          </div>
        ) : (
          /* 팔로우 중인 유저가 없거나 게시글이 없을 때 검색 유도 화면 */
          <FeedEmpty onSearch={onSearch} />
        )}
      </div>
    </>
  );
}
