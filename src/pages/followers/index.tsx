import { useNavigate, useParams } from 'react-router-dom';

import { useFollowerList } from '@/entities/user/hooks/useFollowerList';
import { FollowListHeader } from '@/features/profile/ui/FollowListHeader';
import { FollowUserListItem } from '@/features/profile/ui/FollowUserListItem';
import { cn } from '@/shared/lib';
import { getTokenUserInfo } from '@/shared/lib/utils/token';
import { LoadingSpinner } from '@/shared/ui';

export function FollowersPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followers, isLoading } = useFollowerList(accountname);

  return (
    <div className={cn('bg-background flex min-h-screen flex-col')}>
      <FollowListHeader title="Followers" onBack={() => navigate(-1)} />

      <main className={cn('pt-[48px]')}>
        {isLoading ? (
          <LoadingSpinner fullScreen={false} message="불러오는 중..." />
        ) : followers.length === 0 ? (
          <div className={cn('flex items-center justify-center py-20')}>
            <p className={cn('text-muted-foreground text-sm')}>팔로워가 없습니다.</p>
          </div>
        ) : (
          <ul>
            {followers.map((user) => (
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
