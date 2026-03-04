import { useState } from 'react';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { UploadImageSmallIcon } from '@/shared/assets';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface CommentFooterProps {
  onSubmit?: (comment: string) => void;
}

export function CommentFooter({ onSubmit }: CommentFooterProps) {
  const [value, setValue] = useState('');
  const { profile } = useProfile();

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue('');
  };

  const profileImageUrl = getImageUrl(profile?.image);

  return (
    <div className="bg-background border-border fixed right-0 bottom-0 left-0 flex items-center justify-between border-t p-2">
      <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="내 프로필" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UploadImageSmallIcon />
          </div>
        )}
      </div>
      <input
        type="text"
        className="flex-1 bg-transparent pl-2 text-sm text-[#333] outline-none"
        placeholder="댓글 입력하기"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={`flex-shrink-0 text-sm font-semibold ${value.trim() ? 'text-[#11CC27]' : 'text-[#B2B2B2]'}`}
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        게시
      </button>
    </div>
  );
}
