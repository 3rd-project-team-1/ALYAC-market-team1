import { useState } from 'react';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { getImageUrl } from '@/features/image/lib/getImageUrl';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

interface ChatRoomFooterProps {
  onSubmit?: (message: string) => void;
}

export function ChatRoomFooter({ onSubmit }: ChatRoomFooterProps) {
  const [value, setValue] = useState('');
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
        justifyContent: 'space-between',
        padding: '8px 8px 8px',
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
      <input
        style={styles.input}
        placeholder="메시지 입력하기..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        style={{
          ...styles.button,
          color: value.trim() ? '#11CC27' : '#B2B2B2',
        }}
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        전송
      </button>
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
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  },
} as const;
