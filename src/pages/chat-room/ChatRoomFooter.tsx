import { useState } from 'react';

import { useProfile } from '@/entities/user/hooks/useProfile';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
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
      <div
        style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}
      >
        <img
          src={getImageUrl(profile?.image) ?? uploadImage}
          alt="내 프로필"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #D1D5DB',
          boxShadow: isFocused ? '0 0 0 2px #1E3A8A' : 'none',
          borderRadius: '8px',
          padding: '6px 12px',
          backgroundColor: '#fff',
          transition: 'box-shadow 0.15s',
        }}
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
