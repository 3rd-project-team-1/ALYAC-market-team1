import { useState } from 'react';

import { UploadSImageIcon } from '@/shared/assets/svg-props/svg-props';

interface CommentFooterProps {
  onSubmit?: (comment: string) => void;
}

export function CommentFooter({ onSubmit }: CommentFooterProps) {
  const [value, setValue] = useState('');

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
      <UploadSImageIcon style={{ fontSize: 36 }} />
      <input
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
