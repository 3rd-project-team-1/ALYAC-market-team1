import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

/**
 * 스크롤 기반 무한 로딩 훅입니다.
 * 반환된 `ref`를 리스트 하단 sentinel 요소에 붙이면
 * 뷰포트 진입 시 자동으로 `onLoadMore`를 호출합니다.
 */
export function useInfiniteScroll({ hasMore, isFetching, onLoadMore }: UseInfiniteScrollOptions) {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      onLoadMore();
    }
  }, [inView, hasMore, isFetching, onLoadMore]);

  return { ref };
}
