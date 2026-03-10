import { useNavigate } from 'react-router-dom';

import { UserSearchCard, useUserSearch } from '@/features/search';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { TopSearchNav } from '@/widgets/top-search-nav';

export function SearchPage() {
  const navigate = useNavigate();
  const { searchValue, setSearchValue, searchResults } = useUserSearch();

  /**
   * 사용자 카드 클릭 시 해당 사용자의 프로필 페이지로 이동
   * @param accountname - 사용자의 고유 계정 ID
   */
  const handleUserClick = (accountname: string) => {
    navigate(ROUTE_PATHS.PROFILE_DETAIL(accountname));
  };

  return (
    <div>
      {/* 상단 검색 네비게이션 바 */}
      <TopSearchNav searchValue={searchValue} onSearchChange={setSearchValue} />
      <main className={cn('mx-auto max-w-5xl pt-[48px]')}>
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
