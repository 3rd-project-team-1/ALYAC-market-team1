import { useState } from 'react';

import { UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib';

interface UserAvatarProps {
  src?: string | null;
  username: string;
  className?: string;
}

export function UserAvatar({ src, username }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = src ? (getImageUrl(src) ?? src) : null;

  return (
    <div
      className={cn(
        'flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200',
      )}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={username}
          className={cn('h-full w-full object-cover')}
          onError={() => setImageError(true)}
        />
      ) : (
        <UploadImageSmallIcon />
      )}
    </div>
  );
}
