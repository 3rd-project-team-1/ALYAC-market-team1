import { FollowListBody, FollowListHeader, useFollowersPage } from '@/features/profile';
import { cn } from '@/shared/lib';

export function FollowersPage() {
  const { followers, isLoading, myAccountname, onBack } = useFollowersPage();

  return (
    <div className={cn('bg-background flex min-h-screen flex-col')}>
      <FollowListHeader title="Followers" onBack={onBack} />

      <main className={cn('pt-[48px]')}>
        <FollowListBody
          users={followers}
          isLoading={isLoading}
          myAccountname={myAccountname}
          emptyMessage="팔로워가 없습니다."
        />
      </main>
    </div>
  );
}
