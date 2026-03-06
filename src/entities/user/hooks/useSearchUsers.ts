import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api';

/**
 * 유저를 검색하는 훅
 * @param keyword - 검색할 키워드
 * @returns { data: Profile[], isLoading, error, ... }
 */
export function useSearchUsers(keyword: string) {
  return useQuery({
    queryKey: ['users', 'search', keyword],
    queryFn: () => userApi.searchUsers(keyword).then((res) => res.data),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
