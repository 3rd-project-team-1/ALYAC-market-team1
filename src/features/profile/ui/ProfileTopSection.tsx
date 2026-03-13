import { ChatIcon, ShareIcon, UploadImageIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { Button } from '@/shared/ui';

import { useProfileTopSection } from '../hooks/useProfileTopSection';

export function ProfileTopSection() {
  const {
    profile,
    isMyProfile,
    isFollowing,
    isFollowPending,
    handleFollowersClick,
    handleFollowingsClick,
    handleEditProfileClick,
    handleCreateProductClick,
    handleChatClick,
    handleToggleFollow,
  } = useProfileTopSection();

  if (!profile) return null;

  return (
    <section className={cn('px-6 pt-[60px] pb-6')}>
      <div className={cn('flex items-center justify-center gap-12')}>
        <button className={cn('flex flex-col items-center gap-1')} onClick={handleFollowersClick}>
          <span className={cn('text-foreground text-xl font-bold')}>
            {profile.followerCount ?? 0}
          </span>
          <span className={cn('text-muted-foreground text-xs')}>followers</span>
        </button>

        <div className={cn('bg-muted h-24 w-24 overflow-hidden rounded-full')}>
          {profile.image ? (
            <img
              src={getImageUrl(profile.image) ?? profile.image}
              alt={profile.username}
              className={cn('h-full w-full object-cover')}
            />
          ) : (
            <div className={cn('flex h-full w-full items-center justify-center')}>
              <UploadImageIcon />
            </div>
          )}
        </div>

        <button className={cn('flex flex-col items-center gap-1')} onClick={handleFollowingsClick}>
          <span className={cn('text-foreground text-xl font-bold')}>
            {profile.followingCount ?? 0}
          </span>
          <span className={cn('text-muted-foreground text-xs')}>followings</span>
        </button>
      </div>

      <div className={cn('mt-4 flex flex-col items-center')}>
        <h1 className={cn('text-foreground text-base font-semibold')}>
          {profile.username ?? '이름 없음'}
        </h1>
        <p className={cn('text-muted-foreground mt-0.5 text-sm')}>@{profile.accountname ?? ''}</p>
        {profile.intro && (
          <p className={cn('text-muted-foreground mt-1.5 text-center text-sm')}>{profile.intro}</p>
        )}
      </div>

      <div className={cn('mt-5 flex items-center justify-center gap-3')}>
        {isMyProfile ? (
          <>
            <Button
              variant="outline"
              className={cn('flex-1 rounded-full text-sm font-medium')}
              onClick={handleEditProfileClick}
            >
              프로필 수정
            </Button>
            <Button
              variant="outline"
              className={cn('flex-1 rounded-full text-sm font-medium')}
              onClick={handleCreateProductClick}
            >
              상품 등록
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon-lg"
              className={cn('rounded-full')}
              aria-label="채팅하기"
              onClick={handleChatClick}
            >
              <ChatIcon />
            </Button>

            <Button
              className={cn(
                'rounded-full px-8 text-sm font-semibold text-white',
                isFollowing ? 'bg-muted-foreground' : 'bg-[#3C9E00] hover:bg-[#2d7a00]',
              )}
              onClick={handleToggleFollow}
              disabled={isFollowPending}
            >
              {isFollowing ? '언팔로우' : '팔로우'}
            </Button>

            <Button
              variant="outline"
              size="icon-lg"
              className={cn('rounded-full')}
              aria-label="공유하기"
            >
              <ShareIcon />
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
