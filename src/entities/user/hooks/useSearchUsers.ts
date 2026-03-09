import { useQuery } from '@tanstack/react-query';

import { userQueryKeys } from '../api/queryKeys';
import { searchUsers } from '../api/searchUsers';

/**
 * 유저를 검색하는 훅
 * @param keyword - 검색할 키워드
 * @returns { data: Profile[], isLoading, error, ... }
 */
export function useSearchUsers(keyword: string) {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: userQueryKeys.searchUsers(trimmedKeyword),
    queryFn: () => searchUsers(trimmedKeyword),
    enabled: !!trimmedKeyword,
    staleTime: 1000 * 60 * 5,
  });
}
