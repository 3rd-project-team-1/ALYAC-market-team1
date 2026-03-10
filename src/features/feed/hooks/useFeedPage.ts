import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { ROUTE_PATHS } from '@/shared/routes';

import { useFeedPostsQuery } from './useFeedPostsQuery';

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

  const { isLoading, isFetchingMore, isError, posts, deletePost, loadMore, hasMore } =
    useFeedPostsQuery();

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
    isFetchingMore,
    isError,
    hasMore,
    loadMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch: () => navigate(ROUTE_PATHS.SEARCH),
  };
}
