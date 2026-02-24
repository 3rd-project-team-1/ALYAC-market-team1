import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';
import { UserSearchCard } from '@/pages/search/ui/UserSearchCard';
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

  // 표시할 결과 목록
  const [searchResults, setSearchResults] = useState<SearchResultUser[]>([]);

  // 비동기 응답 역전 방지용 요청 시퀀스
  const latestRequestIdRef = useRef(0);

  const handleUserClick = (accountname: string) => {
    navigate(`/profile/${accountname}`);
  };

  // 입력 변경 시 조회
  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    const keyword = value.trim();
    const requestId = ++latestRequestIdRef.current;

    // 빈 값은 요청 없이 결과 초기화
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await userApi.getProfile(keyword);

      // 최신 요청이 아닐 경우 결과 반영하지 않음
      if (requestId !== latestRequestIdRef.current) {
        return;
      }

      setSearchResults([toSearchResultUser(data.profile)]);
    } catch (error) {
      // 실패 시 결과 비움
      if (requestId !== latestRequestIdRef.current) {
        return;
      }

      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

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
