import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api';

/**
 * 유저를 검색하는 훅
 * @param keyword - 검색할 키워드
 * @returns { data: Profile[], isLoading, error, ... }
 */
export function useSearchUsers(keyword: string) {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['users', 'search', trimmedKeyword],
    queryFn: () => userApi.searchUsers(trimmedKeyword).then((res) => res.data),
    enabled: !!trimmedKeyword,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
