import { cn } from '@/shared/lib';
import { UserAvatar, UserInfo } from '@/shared/ui';

import FollowButton from './followButton';

interface User {
  _id: string;
  username: string;
  accountname: string;
  image?: string | null;
  follower: string[];
  following: string[];
  followerCount: number;
  followingCount: number;
}

interface UserFollowItemProps {
  user: User;
  isFollowing?: boolean;
  onFollowToggle?: (isFollowing: boolean) => void;
}

export default function UserFollowItem({
  user,
  isFollowing = false,
  onFollowToggle,
}: UserFollowItemProps) {
  const { username, accountname, image } = user;

  return (
    <div
      className={cn('box-border flex min-h-[50px] w-[358px] items-center gap-3 bg-white px-4 py-2')}
    >
      <UserAvatar src={image} username={username} />
      <UserInfo username={username} accountname={accountname} />
      <FollowButton isFollowing={isFollowing} onToggle={onFollowToggle} />
    </div>
  );
}
