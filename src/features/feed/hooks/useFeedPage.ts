import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { ROUTE_PATHS } from '@/shared/routes';

import { useFeedPostsQuery } from './useFeedPostsQuery';
import { useSlowFeedFallback } from './useSlowFeedFallback';

/**
 * 피드 페이지의 비즈니스 로직을 담당하는 커스텀 훅입니다.
 *
 * 담당 역할:
 * - JWT 토큰에서 현재 로그인한 유저의 accountname 추출
 * - 피드 게시글 목록 데이터 및 무한 스크롤 상태 관리
 * - 게시글 클릭, 수정, 삭제, 신고, 검색 페이지 이동 핸들러 제공
 *
 * @returns 피드 페이지 렌더링에 필요한 상태값과 이벤트 핸들러
 */
export function useFeedPage() {
  const navigate = useNavigate();
  // JWT 토큰에서 현재 로그인 유저의 accountname 추출 (게시글 수정/삭제 권한 판별에 사용)
  const myAccountname = getTokenUserInfo()?.accountname ?? '';

  const {
    isLoading,
    hasFetchedOnce,
    isFetchingMore,
    isError,
    posts: feedPosts,
    deletePost,
    loadMore,
    retryFeed,
    hasMore,
  } = useFeedPostsQuery();

  // 메인 쿼리 에러가 발생한 동안 폴백 모드 활성화
  const isFallbackMode = isError;

  // 메인 쿼리 실패 시 게시글을 1개씩 천천히 불러오는 폴백
  const {
    posts: fallbackPosts,
    isFetching: isFallbackFetching,
    isDone: isFallbackDone,
  } = useSlowFeedFallback(isFallbackMode, feedPosts.length);

  // 폴백 중에는 기존 피드 + 폴백으로 추가 로드한 게시글을 함께 표시
  const mergedPosts = useMemo(() => {
    const merged = [...feedPosts, ...fallbackPosts];
    const seenIds = new Set<string>();
    return merged.filter((post) => {
      if (seenIds.has(post.id)) return false;
      seenIds.add(post.id);
      return true;
    });
  }, [fallbackPosts, feedPosts]);

  // 게시글 클릭 → 상세 페이지 이동
  const handlePostClick = (postId: string) => {
    navigate(ROUTE_PATHS.POST(postId));
  };

  // 수정 버튼 클릭 → 게시글 수정 페이지 이동
  const handleRewritePost = (postId: string) => {
    navigate(ROUTE_PATHS.EDIT_POST(postId));
  };

  // // 신고 기능 (추후 신고 API 구현시 업데이트 예정)
  // const handleReportPost = (_postId: string) => {
  //   alert('신고 기능은 추후 업데이트 예정입니다.');
  // };

  return {
    myAccountname,
    isLoading,
    hasFetchedOnce,
    isFetchingMore,
    isError: isFallbackMode,
    hasMore,
    loadMore,
    posts: isFallbackMode ? mergedPosts : feedPosts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch: () => navigate(ROUTE_PATHS.SEARCH),
    retryFeed,
    isFallbackFetching,
    isFallbackDone,
  };
}
