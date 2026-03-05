import { cn } from '@/shared/lib';
import { UserAvatar, UserInfo } from '@/shared/ui';

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
          <span key={i} className={cn('font-bold text-[#1BC47D]')}>
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
    <div
      className={cn('box-border flex min-h-[50px] w-[358px] items-center gap-3 bg-white px-4 py-2')}
    >
      <UserAvatar src={image} username={username} />
      <UserInfo username={username} accountname={accountname}>
        <HighlightText text={username} query={searchQuery} />
      </UserInfo>
    </div>
  );
}
