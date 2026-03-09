import { useMemo, useState } from 'react';

import type { Profile } from '@/entities/user';
import { useSearchUsers } from '@/entities/user';
import { useDebounce } from '@/shared/hooks/useDebounce';

export type SearchResultUser = Pick<SearchUser, 'username' | 'accountname' | 'image'>;

const toSearchResultUser = (user: SearchUser): SearchResultUser => ({
  username: user.username,
  accountname: user.accountname,
  image: user.image,
});
export const useUserSearch = (initialSearchValue = '') => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 100);
  const trimmedKeyword = debouncedSearchValue.trim();

  // 엔티티 레이어의 데이터 페칭 훅 사용
  const { data, isLoading, isError } = useSearchUsers(trimmedKeyword);

  // 데이터를 뷰 모델에 맞게 변환
  const searchResults = useMemo(() => {
    if (!trimmedKeyword || !data) return [];
    return data.map(toSearchResultUser);
  }, [data, trimmedKeyword]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
    isLoading,
    isError,
  };
};
