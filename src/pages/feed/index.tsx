import { FeedEmpty, FeedList, useFeedPage } from '@/features/feed';
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
    isFetchingMore,
    isError,
    hasMore,
    loadMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch,
    isFallbackFetching,
    isFallbackDone,
  } = useFeedPage();

  // 최초 데이터 로딩 중 전체 화면 스피너 표시 (추가 페이지 로딩은 FeedList 내부에서 처리)
  if (isLoading) {
    return <LoadingSpinner fullScreen message="피드를 불러오는 중입니다..." />;
  }

  return (
    <>
      <TopMainNav title="알약마켓 피드" />
      {/*pb-[60px]: 하단 탭메뉴 높이만큼 패딩 */}
      <div className={cn('pb-[60px]')}>
        {/* 오류 발생 시 1개씩 불러오기 안내 배너 */}
        {isError && (
          <div className={cn('mx-auto max-w-5xl px-4 pt-[60px]')}>
            <div
              className={cn('rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm')}
            >
              <p className={cn('font-medium text-yellow-800')}>일시적인 서버 오류가 발생했습니다</p>
              <p className={cn('mt-0.5 text-xs text-yellow-600')}>
                {isFallbackDone && posts.length === 0
                  ? '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
                  : '게시글을 하나씩 천천히 불러오고 있습니다...'}
              </p>
              {isFallbackDone && posts.length === 0 && (
                <button
                  className={cn('mt-2 text-xs font-medium text-yellow-700 underline')}
                  onClick={() => window.location.reload()}
                >
                  다시 시도
                </button>
              )}
            </div>
          </div>
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
          />
        ) : isError && !isFallbackFetching ? (
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
