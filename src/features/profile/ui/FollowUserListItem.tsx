import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import type { Profile } from '@/entities/user/types';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface FollowUserListItemProps {
  user: Profile;
  myAccountname: string | null;
}

export function FollowUserListItem({ user, myAccountname }: FollowUserListItemProps) {
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
        {user.intro && <p className="text-muted-foreground truncate text-xs">{user.intro}</p>}
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
