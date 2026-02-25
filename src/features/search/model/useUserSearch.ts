import { useEffect, useRef, useState } from 'react';

import { userApi } from '@/entities/user/api';
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
  const [searchResults, setSearchResults] = useState<SearchResultUser[]>([]);
  const latestRequestIdRef = useRef(0);

  const performSearch = async (keyword: string, requestId: number) => {
    try {
      const { data } = await userApi.searchUsers(keyword);

      if (requestId !== latestRequestIdRef.current) {
        return;
      }

      setSearchResults(data.user.map(toSearchResultUser));
    } catch (error) {
      if (requestId !== latestRequestIdRef.current) {
        return;
      }

      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const keyword = debouncedSearchValue.trim();
    const requestId = ++latestRequestIdRef.current;

    if (!keyword) {
      setSearchResults([]);
      return;
    }

    void performSearch(keyword, requestId);
  }, [debouncedSearchValue]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
  };
};
