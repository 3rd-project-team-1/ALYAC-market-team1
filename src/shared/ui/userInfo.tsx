import { ReactNode } from 'react';

interface UserInfoProps {
  username: string;
  accountname: string;
  children?: ReactNode;
}

export default function UserInfo({ username, accountname, children }: UserInfoProps) {
  return (
    <div style={styles.info}>
      <p style={styles.name}>{children ?? username}</p>
      <p style={styles.handle}>@ {accountname}</p>
    </div>
  );
}

const styles = {
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },
  name: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#1a1a1a',
    lineHeight: '1.3',
  },
  handle: {
    margin: 0,
    fontSize: 12,
    color: '#888',
    lineHeight: '1.3',
  },
};
