import type { Profile } from '@/entities/user';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

import { FollowUserListItem } from './FollowUserListItem';

interface FollowListBodyProps {
  users: Profile[];
  isLoading: boolean;
  myAccountname: string | null;
  emptyMessage: string;
}

export function FollowListBody({
  users,
  isLoading,
  myAccountname,
  emptyMessage,
}: FollowListBodyProps) {
  if (isLoading) {
    return <LoadingSpinner fullScreen={false} message="불러오는 중..." />;
  }

  if (users.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-20')}>
        <p className={cn('text-muted-foreground text-sm')}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id} className={cn('border-border border-b last:border-b-0')}>
          <FollowUserListItem user={user} myAccountname={myAccountname} />
        </li>
      ))}
    </ul>
  );
}
