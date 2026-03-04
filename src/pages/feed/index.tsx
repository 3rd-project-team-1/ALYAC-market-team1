import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFeedPosts } from '@/features/feed/hooks/useFeedPosts';
import { FeedEmpty, FeedList } from '@/features/feed/ui';
import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { TopMainNav } from '@/widgets/top-main-nav';

// 피드 페이지 컴포넌트
export function FeedPage() {
  // 페이지 이동 훅
  const navigate = useNavigate();
  // 토큰에서 사용자 정보 추출
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? '';

  // 피드 관련 상태 및 함수
  const { isLoading, isFetchingMore, posts, setPosts, loadMore, hasMore } = useFeedPosts();
  // 무한 스크롤을 위한 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤: 마지막 PostCard가 화면에 보이면 loadMore 호출
  useEffect(() => {
    if (!hasMore || !observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, posts]);

  // 검색 버튼 클릭 시
  const handleSearchClick = () => {
    navigate('/search');
  };
  // 게시글 클릭 시
  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };
  // 게시글 수정 클릭 시
  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}/edit`);
  };
  // 게시글 삭제 시
  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

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
              onDelete={handleDeletePost}
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
            <FeedEmpty onSearch={handleSearchClick} />
          </>
        )}
      </div>
    </>
  );
}
