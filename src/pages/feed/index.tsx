import { FeedEmpty, FeedList, useFeedPage } from '@/features/feed';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { TopMainNav } from '@/widgets/top-main-nav';

// 피드 페이지 컴포넌트
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

  // 초기 로딩 중 표시 (페이지네이션 로딩은 하단에 별도 표시)
  if (isLoading) {
    return <LoadingSpinner fullScreen message="피드를 불러오는 중입니다..." />;
  }

  // 피드 렌더링
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
          <FeedEmpty onSearch={onSearch} />
        )}
      </div>
    </>
  );
}
