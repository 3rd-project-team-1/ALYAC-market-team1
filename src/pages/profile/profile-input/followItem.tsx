import UserAvatar from '@/shared/ui/user/userAvatar';
import UserInfo from '@/shared/ui/user/userInfo';

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
    <div style={styles.wrapper}>
      <UserAvatar src={image} username={username} />
      <UserInfo username={username} accountname={accountname} />
      <FollowButton isFollowing={isFollowing} onToggle={onFollowToggle} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 358,
    minHeight: 50,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    boxSizing: 'border-box' as const,
    gap: 12,
  },
};
