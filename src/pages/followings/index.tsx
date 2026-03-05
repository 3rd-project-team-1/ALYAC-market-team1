import { useNavigate, useParams } from 'react-router-dom';

import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { FollowListHeader } from '@/features/profile/ui/FollowListHeader';
import { FollowUserListItem } from '@/features/profile/ui/FollowUserListItem';
import { cn } from '@/shared/lib';
import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { LoadingSpinner } from '@/shared/ui';

export function FollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followings, isLoading } = useFollowingList(accountname);

  return (
    <div className={cn('bg-background flex min-h-screen flex-col')}>
      <FollowListHeader title="Followings" onBack={() => navigate(-1)} />

      <main className={cn('pt-[48px]')}>
        {isLoading ? (
          <LoadingSpinner fullScreen={false} message="불러오는 중..." />
        ) : followings.length === 0 ? (
          <div className={cn('flex items-center justify-center py-20')}>
            <p className={cn('text-muted-foreground text-sm')}>팔로잉한 사용자가 없습니다.</p>
          </div>
        ) : (
          <ul>
            {followings.map((user) => (
              <li key={user._id} className={cn('border-border border-b last:border-b-0')}>
                <FollowUserListItem user={user} myAccountname={myAccountname} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
