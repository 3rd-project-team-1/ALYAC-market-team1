import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import type { Profile } from '@/entities/user/types';
import { getImageUrl } from '@/features/image/lib/getImageUrl';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

function FollowUserListItem({
  user,
  myAccountname,
}: {
  user: Profile;
  myAccountname: string | null;
}) {
  const isMe = user.accountname === myAccountname;
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: user.isfollow,
  });

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
        {getImageUrl(user.image) ? (
          <img
            src={getImageUrl(user.image)!}
            alt={user.username}
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <p className="text-foreground truncate text-sm font-semibold">{user.username}</p>
        {user.intro && (
          <p className="text-muted-foreground truncate text-xs">{user.intro}</p>
        )}
      </div>

      {!isMe && (
        <button
          onClick={() => toggleFollow(user.accountname)}
          disabled={followMutation.isPending}
          className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            isFollowing
              ? 'border border-gray-300 bg-white text-gray-500'
              : 'bg-[#3C9E00] text-white hover:bg-[#2d7a00]'
          }`}
        >
          {isFollowing ? '언팔로우' : '팔로우'}
        </button>
      )}
    </div>
  );
}

export function FollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname =
    tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followings, isLoading } = useFollowingList(accountname);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="bg-background border-border fixed top-0 right-0 left-0 z-10 flex h-[48px] items-center border-b px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-foreground flex-1 text-center text-base font-semibold">Followings</h1>
        <div className="h-8 w-8" />
      </header>

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
