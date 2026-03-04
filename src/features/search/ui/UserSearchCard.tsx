import { UserAvatar } from '@/shared/ui';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface UserSearchCardProps {
  user: {
    username: string;
    accountname: string;
    image?: string;
  };
  onClick: () => void;
  highlight?: string;
}

export function UserSearchCard({ user, onClick, highlight }: UserSearchCardProps) {
  const escapedHighlight = highlight ? escapeRegExp(highlight) : '';

  const highlightedUsername = escapedHighlight
    ? user.username.replace(new RegExp(`(${escapedHighlight})`, 'gi'), '<mark>$1</mark>')
    : user.username;

  return (
    <div
      className="border-border flex cursor-pointer items-center gap-3 border-b px-4 py-3"
      onClick={onClick}
    >
      <UserAvatar src={user.image} username={user.username} />
      <div>
        <p
          className="text-foreground text-sm font-semibold"
          dangerouslySetInnerHTML={{ __html: highlightedUsername }}
        />
        <p className="text-muted-foreground text-xs">@{user.accountname}</p>
      </div>
    </div>
  );
}
