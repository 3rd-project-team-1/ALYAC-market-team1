import type { MouseEvent } from 'react';

import type { PostCardModel } from '@/features/feed';
import { MoreIcon } from '@/shared/assets';
import { cn, getRelativeTime } from '@/shared/lib';

import { PostCardDropdown, type DropdownItem } from './PostCardDropdown';

interface PostCardHeaderProps {
  post: PostCardModel;
  isMenuOpen: boolean;
  menuItems: DropdownItem[];
  onMenuToggle: (e: MouseEvent) => void;
  onCloseMenu: () => void;
  menuId: string;
}

export function PostCardHeader({
  post,
  isMenuOpen,
  menuItems,
  onMenuToggle,
  onCloseMenu,
  menuId,
}: PostCardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between')}>
      <div>
        <p className={cn('text-foreground text-sm font-semibold')}>{post.author.username}</p>
        <p className={cn('text-muted-foreground text-xs')}>
          @{post.author.accountname}
          <span className={cn('mx-1')}>·</span>
          <time dateTime={post.createdAt}>{getRelativeTime(post.createdAt)}</time>
        </p>
      </div>

      <div className={cn('relative')}>
        <button
          type="button"
          aria-label="게시글 메뉴"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-haspopup="menu"
          className={cn(
            'text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md',
          )}
          onClick={onMenuToggle}
        >
          <MoreIcon className={cn('h-4 w-4')} aria-label="더보기" />
        </button>
        {isMenuOpen && <PostCardDropdown onClose={onCloseMenu} items={menuItems} menuId={menuId} />}
      </div>
    </div>
  );
}
