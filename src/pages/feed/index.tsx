import { FeedEmpty, FeedList, useFeedPage } from '@/features/feed';
import { TopMainNav } from '@/widgets/top-main-nav';

// 피드 페이지 컴포넌트
export function FeedPage() {
  const {
    myAccountname,
    observerRef,
    isLoading,
    isFetchingMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch,
  } = useFeedPage();

  // 초기 로딩 중 표시 (페이지네이션 로딩은 하단에 별도 표시)
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 피드 렌더링
  return (
    <>
      <TopMainNav title="얄약마켓 피드" />
      {/*pb-[60px]: 하단 탭메뉴 높이만큼 패딩 */}
      <div className="pb-[60px]">
        {posts.length > 0 ? (
          <>
            {/* 피드 리스트 - 마지막 카드에 ref 전달 */}
            <FeedList
              posts={posts}
              myAccountname={myAccountname}
              onRewrite={handleRewritePost}
              onDelete={deletePost}
              onClick={handlePostClick}
              lastCardRef={observerRef}
            />
            {/* 추가 로딩 인디케이터 */}
            {isFetchingMore && (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <span>불러오는 중...</span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 피드가 비어있을 때 */}
            <FeedEmpty onSearch={onSearch} />
          </>
        )}
      </div>
    </>
  );
}
