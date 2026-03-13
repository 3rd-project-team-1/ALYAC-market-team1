import { useState } from 'react';

import { CircleMinus, CirclePlus, Plus, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import { UploadImageSmallIcon } from '@/shared/assets';
import { cn, getImageUrl } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';

interface AvatarActionPopoverProps {
  accountname: string;
  image?: string;
  username: string;
  isMyPost?: boolean;
  initialIsFollow?: boolean;
}

export function AvatarActionPopover({
  accountname,
  image,
  username,
  isMyPost = false,
  initialIsFollow = false,
}: AvatarActionPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow,
  });

  const imageUrl = getImageUrl(image);

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTE_PATHS.PROFILE_DETAIL(accountname));
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleProfileVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    navigate(ROUTE_PATHS.PROFILE_DETAIL(accountname));
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFollow(accountname);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative shrink-0')}>
      {/* 아바타 — 클릭 시 프로필 이동 */}
      <button type="button" aria-label={`${username} 프로필 보기`} onClick={handleAvatarClick}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={username}
            className={cn('h-11 w-11 rounded-full object-cover')}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div
            className={cn('flex h-11 w-11 items-center justify-center rounded-full bg-gray-100')}
          >
            <UploadImageSmallIcon />
          </div>
        )}
      </button>

      {/* "+" 버튼 — 본인 게시글이 아닐 때만 표시 */}
      {!isMyPost && (
        <button
          type="button"
          aria-label="팔로우 메뉴 열기"
          onClick={handlePlusClick}
          className={cn(
            'border-background absolute -right-1 -bottom-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-[#3C9E00] text-white',
          )}
        >
          <Plus className={cn('h-3 w-3 stroke-[3]')} />
        </button>
      )}

      {/* 팝오버 */}
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 */}
          <button
            type="button"
            className={cn('fixed inset-0 z-10 cursor-default')}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <div
            className={cn(
              'absolute top-12 left-0 z-20 min-w-[160px] overflow-hidden rounded-2xl border border-white/30 bg-white/85 shadow-lg backdrop-blur-md',
            )}
          >
            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white/50 active:bg-white/70',
              )}
              onClick={handleFollow}
              disabled={followMutation.isPending}
            >
              {isFollowing ? (
                <CircleMinus className={cn('h-5 w-5 text-gray-600')} />
              ) : (
                <CirclePlus className={cn('h-5 w-5 text-gray-600')} />
              )}
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </button>
            <div className={cn('h-px bg-gray-200/80')} />
            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white/50 active:bg-white/70',
              )}
              onClick={handleProfileVisit}
            >
              <UserRound className={cn('h-5 w-5 text-gray-600')} />
              프로필 방문
            </button>
          </div>
        </>
      )}
    </div>
  );
}
