import UserAvatar from '@/shared/ui/userAvatar';
import UserInfo from '@/shared/ui/userInfo';

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

interface UserSearchItemProps {
  user: User;
  searchQuery?: string;
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ color: '#1BC47D', fontWeight: 700 }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function UserSearchItem({ user, searchQuery = '' }: UserSearchItemProps) {
  const { username, accountname, image } = user;

  return (
    <div style={styles.wrapper}>
      <UserAvatar src={image} username={username} />
      <UserInfo username={username} accountname={accountname}>
        <HighlightText text={username} query={searchQuery} />
      </UserInfo>
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
