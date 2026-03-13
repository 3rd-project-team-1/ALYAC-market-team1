import { useMemo, useState } from 'react';

import type { Profile, SearchUser } from '@/entities/user';
import { useSearchUsers } from '@/entities/user';
import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { useDebounce } from '@/shared/hooks/useDebounce';

export type SearchResultUser = Pick<SearchUser, 'username' | 'accountname' | 'image'> & {
  isfollow: boolean;
  isMe: boolean;
};
export const useUserSearch = (initialSearchValue = '') => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 100);
  const trimmedKeyword = debouncedSearchValue.trim();

  const myAccountname = getTokenUserInfo()?.accountname ?? null;
  const { followings } = useFollowingList(myAccountname ?? undefined);
  const followingSet = useMemo(
    () => new Set(followings.map((following: Profile) => following.accountname)),
    [followings],
  );

  // 엔티티 레이어의 데이터 페칭 훅 사용
  const { data, isLoading, isError } = useSearchUsers(trimmedKeyword);

  // 데이터를 뷰 모델에 맞게 변환
  const searchResults = useMemo(() => {
    if (!trimmedKeyword || !data) return [];
    return data.map((user) => ({
      username: user.username,
      accountname: user.accountname,
      image: user.image,
      isfollow: followingSet.has(user.accountname),
      isMe: user.accountname === myAccountname,
    }));
  }, [data, trimmedKeyword, followingSet, myAccountname]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
    isLoading,
    isError,
  };
};
