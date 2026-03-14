import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { UserSearchCard, useUserSearch } from '@/features/search';
import { cn } from '@/shared/lib';
import { FRONTEND_URL, ROUTE_PATHS } from '@/shared/routes';
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
    <>
      <Helmet>
        <title>유저 검색 | Alyac Market</title>
        <link rel="canonical" href={`${FRONTEND_URL}${ROUTE_PATHS.SEARCH}`} />
        {/* 검색 페이지 자체는 결과가 계속 변하므로 로봇이 수집하지 않게 하는 경우가 많다. */}
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="알약마켓의 다양한 유저들을 검색하고 팔로우해보세요." />
      </Helmet>

      {/* 상단 검색 네비게이션 바 */}
      <TopSearchNav searchValue={searchValue} onSearchChange={setSearchValue} />

      <main className={cn('mx-auto max-w-5xl pt-[48px] pb-20')}>
        <h1 className="sr-only">유저 검색 페이지</h1>

        {/* 검색 결과가 있을 때: 리스트 구조(ul, li)로 */}
        {searchResults.length > 0 ? (
          <ul className={cn('flex flex-col')}>
            {searchResults.map((user) => (
              <li key={user.accountname}>
                <UserSearchCard
                  user={user}
                  onClick={() => handleUserClick(user.accountname)}
                  highlight={searchValue}
                />
              </li>
            ))}
          </ul>
        ) : (
          /*  검색 결과가 없을 때의 UX 처리 */
          searchValue && (
            <div className={cn('flex flex-col items-center justify-center py-20 text-gray-500')}>
              <p>검색 결과가 없습니다. 🔍</p>
            </div>
          )
        )}
      </main>
    </>
  );
}
