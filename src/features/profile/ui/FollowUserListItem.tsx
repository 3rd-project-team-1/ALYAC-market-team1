import { useNavigate } from 'react-router-dom';

import type { Profile } from '@/entities/user';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import { UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface FollowUserListItemProps {
  user: Profile;
  myAccountname: string | null;
}

export function FollowUserListItem({ user, myAccountname }: FollowUserListItemProps) {
  const navigate = useNavigate();
  const isMe = user.accountname === myAccountname;
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: user.isfollow,
  });

  const handleProfileClick = () => {
    navigate(`/profile/${user.accountname}`);
  };

  return (
    <div className={cn('flex items-center gap-3 px-4 py-3')}>
      <button
        type="button"
        onClick={handleProfileClick}
        className={cn(
          'flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200',
        )}
      >
        {user.image ? (
          <img
            src={getImageUrl(user.image) ?? user.image}
            alt={user.username}
            className={cn('h-full w-full object-cover')}
          />
        ) : (
          <UploadImageSmallIcon className={cn('h-42 w-42')} />
        )}
      </button>

      <button
        type="button"
        onClick={handleProfileClick}
        className={cn('flex flex-1 flex-col gap-0.5 overflow-hidden text-left')}
      >
        <p className={cn('text-foreground truncate text-sm font-semibold')}>{user.username}</p>
        {user.intro && <p className={cn('text-muted-foreground truncate text-xs')}>{user.intro}</p>}
      </button>

      {!isMe && (
        <button
          onClick={() => toggleFollow(user.accountname)}
          disabled={followMutation.isPending}
          className={cn(
            'w-[76px] flex-shrink-0 rounded-full py-1.5 text-center text-xs font-semibold transition-colors',
            isFollowing
              ? 'border border-gray-300 bg-white text-gray-500'
              : 'bg-[#3C9E00] text-white hover:bg-[#2d7a00]',
          )}
        >
          {isFollowing ? '언팔로우' : '팔로우'}
        </button>
      )}
    </div>
  );
}
