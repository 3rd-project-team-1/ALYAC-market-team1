import { useState } from 'react';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { UploadImageSmallIcon } from '@/shared/assets';
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
      className="bg-background border-border border-t"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
        {profile?.image ? (
          <img
            src={getImageUrl(profile.image) ?? profile.image}
            alt="내 프로필"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UploadImageSmallIcon />
          </div>
        )}
      </div>
      <div
        className={`flex flex-1 items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 transition-all ${isFocused ? 'ring-2 ring-blue-900' : ''}`}
      >
        <input
          style={styles.input}
          placeholder="메시지 입력하기..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          style={{
            ...styles.button,
            backgroundColor: value.trim() ? '#3C9E00' : '#B2B2B2',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: '8px',
            cursor: value.trim() ? 'pointer' : 'default',
          }}
          onClick={handleSubmit}
          disabled={!value.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
}

const styles = {
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#333',
    backgroundColor: 'transparent',
  },
  button: {
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    flexShrink: 0,
    transition: 'background-color 0.15s',
  },
} as const;
