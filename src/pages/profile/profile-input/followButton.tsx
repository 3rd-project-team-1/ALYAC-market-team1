import { useState } from 'react';

interface FollowButtonProps {
  isFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
}

export default function FollowButton({
  isFollowing: initialFollowing = false,
  onToggle,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);

  const handleClick = () => {
    const next = !following;
    setFollowing(next);
    onToggle?.(next);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...styles.btn,
        backgroundColor: following ? '#fff' : '#1BC47D',
        color: following ? '#1BC47D' : '#fff',
        border: following ? '1px solid #1BC47D' : 'none',
      }}
    >
      {following ? '팔로잉' : '팔로우'}
    </button>
  );
}

const styles = {
  btn: {
    flexShrink: 0,
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
