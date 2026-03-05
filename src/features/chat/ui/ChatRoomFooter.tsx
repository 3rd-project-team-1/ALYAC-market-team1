import { useState } from 'react';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface ChatRoomFooterProps {
  onSubmit?: (message: string) => void;
}

export function ChatRoomFooter({ onSubmit }: ChatRoomFooterProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { profile } = useProfile();

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue('');
  };

  return (
    <div
      className={cn(
        'bg-background border-border fixed right-0 bottom-0 left-0 flex items-center gap-2 border-t px-4 py-2',
      )}
    >
      <div className={cn('h-9 w-9 flex-shrink-0 overflow-hidden rounded-full')}>
        {profile?.image ? (
          <img
            src={getImageUrl(profile.image) ?? profile.image}
            alt="내 프로필"
            className={cn('h-full w-full object-cover')}
          />
        ) : (
          <div className={cn('flex h-full w-full items-center justify-center')}>
            <UploadImageSmallIcon />
          </div>
        )}
      </div>
      <div
        className={cn(
          'flex flex-1 items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 transition-all',
          isFocused && 'ring-2 ring-blue-900',
        )}
      >
        <input
          className={cn('flex-1 border-none bg-transparent text-sm text-[#333] outline-none')}
          placeholder="메시지 입력하기..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className={cn(
            'flex-shrink-0 rounded-lg px-[18px] py-2 text-sm font-semibold text-white transition-colors',
            value.trim() ? 'cursor-pointer bg-[#3C9E00]' : 'cursor-default bg-[#B2B2B2]',
          )}
          onClick={handleSubmit}
          disabled={!value.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
}
