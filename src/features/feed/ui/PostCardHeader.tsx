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
      <div className={cn('min-w-0')}>
        <div className={cn('flex items-center gap-1.5')}>
          <p className={cn('text-foreground truncate text-[15px] font-semibold leading-tight')}>
            {post.author.username}
          </p>
          <span className={cn('text-muted-foreground shrink-0 text-xs')}>
            · {getRelativeTime(post.createdAt)}
          </span>
        </div>
        <p className={cn('text-muted-foreground truncate text-xs leading-tight')}>
          @{post.author.accountname}
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
