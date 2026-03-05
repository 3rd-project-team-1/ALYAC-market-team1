import { cn } from '@/shared/lib';

interface UserAvatarProps {
  src?: string | null;
  username: string;
}

export function UserAvatar({ src, username }: UserAvatarProps) {
  return src ? (
    <img
      src={src}
      alt={username}
      className={cn('h-9 w-9 flex-shrink-0 rounded-full object-cover')}
    />
  ) : (
    <div
      className={cn(
        'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#e9e9e9]',
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="#bbb" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
