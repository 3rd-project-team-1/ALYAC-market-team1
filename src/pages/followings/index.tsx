import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { FollowListHeader } from '@/features/profile/ui/FollowListHeader';
import { FollowUserListItem } from '@/features/profile/ui/FollowUserListItem';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

export function FollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followings, isLoading } = useFollowingList(accountname);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <FollowListHeader title="Followings" onBack={() => navigate(-1)} />

      {/* 목록 */}
      <main className="pt-[48px]">
        {isLoading ? (
          <LoadingSpinner fullScreen={false} message="불러오는 중..." />
        ) : followings.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground text-sm">팔로잉한 사용자가 없습니다.</p>
          </div>
        ) : (
          <ul>
            {followings.map((user) => (
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
