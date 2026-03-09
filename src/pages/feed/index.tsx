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
    hasMore,
    loadMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    handleReportPost,
    onSearch,
  } = useFeedPage();

  // 최초 데이터 로딩 중 전체 화면 스피너 표시 (추가 페이지 로딩은 FeedList 내부에서 처리)
  if (isLoading) {
    return <LoadingSpinner fullScreen message="피드를 불러오는 중입니다..." />;
  }

  return (
    <>
      <TopMainNav title="얄약마켓 피드" />
      {/*pb-[60px]: 하단 탭메뉴 높이만큼 패딩 */}
      <div className={cn('pb-[60px]')}>
        {posts.length > 0 ? (
          <FeedList
            posts={posts}
            myAccountname={myAccountname}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
            onLoadMore={loadMore}
            onRewrite={handleRewritePost}
            onDelete={deletePost}
            onReport={handleReportPost}
            onClick={handlePostClick}
          />
        ) : (
          /* 팔로우 중인 유저가 없거나 게시글이 없을 때 검색 유도 화면 */
          <FeedEmpty onSearch={onSearch} />
        )}
      </div>
    </>
  );
}
