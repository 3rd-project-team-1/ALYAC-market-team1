import { FollowListBody, FollowListHeader, useFollowingsPage } from '@/features/profile';
import { cn } from '@/shared/lib';

export function FollowingsPage() {
  const { followings, isLoading, myAccountname, onBack } = useFollowingsPage();

  return (
    <div className={cn('bg-background flex min-h-screen flex-col')}>
      <FollowListHeader title="Followings" onBack={onBack} />

      <main className={cn('pt-[48px]')}>
        <FollowListBody
          users={followings}
          isLoading={isLoading}
          myAccountname={myAccountname}
          emptyMessage="팔로잉한 사용자가 없습니다."
        />
      </main>
    </div>
  );
}
