import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';
import { UserSearchCard } from '@/pages/search/user-search-card/UserSearchCard';
import { TopSearchNav } from '@/widgets/top-search-nav';

type SearchResultUser = Pick<Profile, 'username' | 'accountname' | 'image'>;

export function SearchPage() {
  const navigate = useNavigate();

  // 검색 입력값
  const [searchValue, setSearchValue] = useState('');

  // 렌더링용 검색 결과
  const [searchResults, setSearchResults] = useState<SearchResultUser[]>([]);

  const handleUserClick = (accountname: string) => {
    navigate(`/profile/${accountname}`);
  };

  // 입력 변경 시: 값 반영 후 단건 프로필 조회
  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    const keyword = value.trim();

    // 빈 입력이면 네트워크 요청 없이 결과 초기화
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await userApi.getProfile(keyword);
      const userData: SearchResultUser = {
        username: data.profile.username,
        accountname: data.profile.accountname,
        image: data.profile.image,
      };
      setSearchResults([userData]);
    } catch (error) {
      // 조회 실패 시 화면 결과 비움
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <TopSearchNav searchValue={searchValue} onSearchChange={handleSearchChange} />
      <main className="mx-auto max-w-5xl pt-[48px]">
        {/* 검색 결과 목록 */}
        {searchResults.map((user) => (
          <UserSearchCard
            key={user.accountname}
            user={user}
            onClick={() => handleUserClick(user.accountname)}
            // 카드 내부 username 하이라이트 키워드
            highlight={searchValue}
          />
        ))}
      </main>
    </div>
  );
}
