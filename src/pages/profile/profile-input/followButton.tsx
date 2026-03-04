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
      className={`flex-shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-150 ${
        following
          ? 'border border-[#1BC47D] bg-white text-[#1BC47D]'
          : 'border-none bg-[#1BC47D] text-white'
      }`}
    >
      {following ? '팔로잉' : '팔로우'}
    </button>
  );
}
