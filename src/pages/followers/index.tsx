import { Helmet } from 'react-helmet-async';

import { FollowListBody, FollowListHeader, useFollowersPage } from '@/features/profile';
import { cn } from '@/shared/lib';

export function FollowersPage() {
  const { followers, isLoading, myAccountname, onBack } = useFollowersPage();

  return (
    <>
      <Helmet>
        <title>팔로워 목록 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={cn('bg-background flex min-h-screen flex-col')}>
        <FollowListHeader title="Followers" onBack={onBack} />

        <main className={cn('flex flex-1 flex-col pt-[48px]')}>
          <h1 className="sr-only">나를 팔로우하는 사용자 목록</h1>

          <FollowListBody
            users={followers}
            isLoading={isLoading}
            myAccountname={myAccountname}
            emptyMessage="팔로워가 없습니다."
          />
        </main>
      </div>
    </>
  );
}
