import { useMemo, useState } from 'react';

import { useSearchUsers } from '@/entities/user/hooks';
import type { Profile } from '@/entities/user/types';
import { useDebounce } from '@/shared/hooks/useDebounce';

export type SearchResultUser = Pick<Profile, 'username' | 'accountname' | 'image'>;

const toSearchResultUser = (profile: Profile): SearchResultUser => ({
  username: profile.username,
  accountname: profile.accountname,
  image: profile.image,
});

export const useUserSearch = (initialSearchValue = '') => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 100);

  // 엔티티 레이어의 데이터 페칭 훅 사용
  const { data, isLoading, isError } = useSearchUsers(debouncedSearchValue);

  // 데이터를 뷰 모델에 맞게 변환
  const searchResults = useMemo(() => {
    if (!debouncedSearchValue.trim() || !data) return [];
    return data.map(toSearchResultUser);
  }, [data, debouncedSearchValue]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
    isLoading,
    isError,
  };
};
