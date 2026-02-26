import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { useFollowerList } from '@/entities/user/hooks/useFollowerList';
import { FollowListHeader } from '@/features/profile/ui/FollowListHeader';
import { FollowUserListItem } from '@/features/profile/ui/FollowUserListItem';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

export function FollowersPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname =
    tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followers, isLoading } = useFollowerList(accountname);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <FollowListHeader title="Followers" onBack={() => navigate(-1)} />

      {/* 목록 */}
      <main className="pt-[48px]">
        {isLoading ? (
          <LoadingSpinner fullScreen={false} message="불러오는 중..." />
        ) : followers.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground text-sm">팔로워가 없습니다.</p>
          </div>
        ) : (
          <ul>
            {followers.map((user) => (
              <li key={user._id} className="border-border border-b last:border-b-0">
                <FollowUserListItem user={user} myAccountname={myAccountname} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
