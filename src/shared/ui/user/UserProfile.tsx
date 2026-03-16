import { ReactNode } from 'react';

import { cn } from '@/shared/lib';

import { UserAvatar } from './UserAvatar';

interface UserProfileProps {
  image?: string | null;
  username: ReactNode;
  accountname: string;
  className?: string;
  avatarClassName?: string;
}

export function UserProfile({
  image,
  username,
  accountname,
  className,
  avatarClassName,
}: UserProfileProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* 프사 영역:  UserAvatar 컴포넌트  */}
      <UserAvatar
        className={avatarClassName}
        src={image}
        username={typeof username === 'string' ? username : 'User'}
      />

      {/* 텍스트 영역: 이름과 계정명 */}
      <div className="flex min-w-0 flex-col">
        <div className={cn('text-foreground truncate text-sm font-semibold')}>{username}</div>
        <div className={cn('text-muted-foreground truncate text-xs')}>@{accountname}</div>
      </div>
    </div>
  );
}
