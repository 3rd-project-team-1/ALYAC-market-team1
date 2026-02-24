import UserAvatar from '@/shared/ui/userAvatar';

interface UserSearchCardProps {
  // 검색 결과로 표시할 사용자 기본 정보
  user: {
    username: string;
    accountname: string;
    image?: string;
  };
  // 카드 클릭 시(예: 프로필 페이지 이동) 실행할 핸들러
  onClick: () => void;
  // 입력한 검색어(있으면 username에서 하이라이트 처리)
  highlight?: string;
}

export function UserSearchCard({ user, onClick, highlight }: UserSearchCardProps) {
  // 검색어가 있으면 username에서 일치 문자열을 <mark>로 감싸 강조 표시
  const highlightedUsername = highlight
    ? user.username.replace(new RegExp(`(${highlight})`, 'gi'), '<mark>$1</mark>')
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
          // <mark> 태그가 포함된 문자열을 렌더링하기 위해 사용
          dangerouslySetInnerHTML={{ __html: highlightedUsername }}
        />
        <p className="text-muted-foreground text-xs">@{user.accountname}</p>
      </div>
    </div>
  );
}
