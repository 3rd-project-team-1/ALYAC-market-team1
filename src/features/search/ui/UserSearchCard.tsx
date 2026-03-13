import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import { cn } from '@/shared/lib';
import { UserAvatar } from '@/shared/ui';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface UserSearchCardProps {
  user: {
    username: string;
    accountname: string;
    image: string | null;
    isfollow: boolean;
    isMe: boolean;
  };
  onClick: () => void;
  highlight?: string;
}

export function UserSearchCard({ user, onClick, highlight }: UserSearchCardProps) {
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: user.isfollow,
  });
  const escapedHighlight = highlight ? escapeRegExp(highlight) : '';

  const highlightedUsername = escapedHighlight
    ? user.username.replace(new RegExp(`(${escapedHighlight})`, 'gi'), '<mark>$1</mark>')
    : user.username;

  return (
    <div
      className={cn('border-border flex cursor-pointer items-center gap-3 border-b px-4 py-3')}
      onClick={onClick}
    >
      <UserAvatar src={user.image} username={user.username} />
      <div className={cn('min-w-0 flex-1')}>
        <p
          className={cn('text-foreground text-sm font-semibold')}
          dangerouslySetInnerHTML={{ __html: highlightedUsername }}
        />
        <p className={cn('text-muted-foreground text-xs')}>@{user.accountname}</p>
      </div>
      {!user.isMe && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFollow(user.accountname);
          }}
          disabled={followMutation.isPending}
          className={cn(
            'w-[76px] flex-shrink-0 rounded-full py-1.5 text-center text-xs font-semibold transition-colors',
            isFollowing
              ? 'border border-gray-300 bg-white text-gray-500'
              : 'bg-[#3C9E00] text-white hover:bg-[#2d7a00]',
          )}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </button>
      )}
    </div>
  );
}
