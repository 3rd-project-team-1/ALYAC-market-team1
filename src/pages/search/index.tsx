import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';
import { UserSearchCard } from '@/pages/search/ui/UserSearchCard';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { TopSearchNav } from '@/widgets/top-search-nav';

type SearchResultUser = Pick<Profile, 'username' | 'accountname' | 'image'>;

const toSearchResultUser = (profile: Profile): SearchResultUser => ({
  username: profile.username,
  accountname: profile.accountname,
  image: profile.image,
});

export function SearchPage() {
  const navigate = useNavigate();

  // 검색어
  const [searchValue, setSearchValue] = useState('');
  // 디바운스 100ms
  const debouncedSearchValue = useDebounce(searchValue, 100);

  // 표시할 결과 목록
  const [searchResults, setSearchResults] = useState<SearchResultUser[]>([]);

  // 비동기 응답 역전 방지용 요청 시퀀스
  const latestRequestIdRef = useRef(0);

  const handleUserClick = (accountname: string) => {
    navigate(`/api/profile/${accountname}`);
  };

  // 입력 변경 시 검색어 상태만 갱신
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const keyword = debouncedSearchValue.trim();
    const requestId = ++latestRequestIdRef.current;

    // 빈 값은 요청 없이 결과 초기화
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const { data } = await userApi.searchUsers(keyword);

        // 최신 요청이 아닐 경우 결과 반영하지 않음
        if (requestId !== latestRequestIdRef.current) {
          return;
        }

        setSearchResults(data.user.map(toSearchResultUser));
      } catch (error) {
        // 실패 시 결과 비움
        if (requestId !== latestRequestIdRef.current) {
          return;
        }

        console.error('Search failed:', error);
        setSearchResults([]);
      }
    };

    void fetchSearchResults();
  }, [debouncedSearchValue]);

  return (
    <div>
      <TopSearchNav searchValue={searchValue} onSearchChange={handleSearchChange} />
      <main className="mx-auto max-w-5xl pt-[48px]">
        {/* 렌더링: 검색 결과 목록 */}
        {searchResults.map((user) => (
          <UserSearchCard
            key={user.accountname}
            user={user}
            onClick={() => handleUserClick(user.accountname)}
            highlight={searchValue}
          />
        ))}
      </main>
    </div>
  );
}
