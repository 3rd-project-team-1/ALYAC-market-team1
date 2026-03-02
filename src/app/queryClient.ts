import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10, // 10분 후 캐시 제거
      staleTime: 1000 * 60 * 5, // 5분 동안 fresh 유지
      refetchOnWindowFocus: false, // 탭 다시 클릭해도 재요청 X
      retry: 1, // 실패 시 1번 재시도
    },
    mutations: {
      retry: 0, // mutation은 재시도 X
    },
  },
});
