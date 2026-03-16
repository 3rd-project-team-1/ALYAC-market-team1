import { Helmet } from 'react-helmet-async';

import { FollowListBody, FollowListHeader, useFollowingsPage } from '@/features/profile';
import { cn } from '@/shared/lib';

export function FollowingsPage() {
  const { followings, isLoading, myAccountname, onBack } = useFollowingsPage();

  return (
    <>
      <Helmet>
        <title>팔로잉 목록 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={cn('bg-background flex min-h-screen flex-col')}>
        <FollowListHeader title="Followings" onBack={onBack} />

        <main className={cn('flex flex-1 flex-col pt-[48px]')}>
          <h1 className="sr-only">내가 팔로잉하는 사용자 목록</h1>

          <FollowListBody
            users={followings}
            isLoading={isLoading}
            myAccountname={myAccountname}
            emptyMessage="팔로잉한 사용자가 없습니다."
          />
        </main>
      </div>
    </>
  );
}
