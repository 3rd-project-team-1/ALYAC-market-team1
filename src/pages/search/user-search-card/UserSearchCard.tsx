import UserAvatar from '@/shared/ui/userAvatar';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface UserSearchCardProps {
  // 카드에 표시할 사용자 요약 정보
  user: {
    username: string;
    accountname: string;
    image?: string;
  };
  // 카드 클릭 액션
  onClick: () => void;
  // username 하이라이트 키워드
  highlight?: string;
}

export function UserSearchCard({ user, onClick, highlight }: UserSearchCardProps) {
  const escapedHighlight = highlight ? escapeRegExp(highlight) : '';

  // keyword가 있으면 일치 구간을 <mark>로 감싸 강조
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
          // 하이라이트 마크업 문자열 렌더링
          dangerouslySetInnerHTML={{ __html: highlightedUsername }}
        />
        <p className="text-muted-foreground text-xs">@{user.accountname}</p>
      </div>
    </div>
  );
}
