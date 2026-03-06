import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api/searchUsers';

/**
 * 유저를 검색하는 훅
 * @param keyword - 검색할 키워드
 * @returns { data: Profile[], isLoading, error, ... }
 */
export function useSearchUsers(keyword: string) {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['users', 'search', trimmedKeyword],
    queryFn: () => searchUsers(trimmedKeyword),
    enabled: !!trimmedKeyword,
    staleTime: 1000 * 60 * 5,
  });
}
