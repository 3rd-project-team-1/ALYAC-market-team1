interface UserAvatarProps {
  src?: string | null;
  username: string;
}

export function UserAvatar({ src, username }: UserAvatarProps) {
  return src ? (
    <img src={src} alt={username} style={styles.avatar} />
  ) : (
    <div style={styles.avatarFallback}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="#bbb" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const styles = {
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    flexShrink: 0,
  },
  avatarFallback: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: '#e9e9e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
};
