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
        className="pl-2"
        style={styles.input}
        placeholder="댓글 입력하기"
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
        게시
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
