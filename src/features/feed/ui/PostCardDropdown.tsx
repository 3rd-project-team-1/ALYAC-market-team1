import type { MouseEvent } from 'react';

import { cn } from '@/shared/lib';

export type DropdownItem = {
  label: string;
  onClick: (e: MouseEvent) => void;
  variant?: 'danger';
};

interface PostCardDropdownProps {
  onClose: () => void;
  items: DropdownItem[];
  menuId: string;
}

export function PostCardDropdown({ onClose, items, menuId }: PostCardDropdownProps) {
  return (
    <>
      <button
        type="button"
        className={cn('fixed inset-0 z-10 cursor-default')}
        aria-label="메뉴 닫기"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        id={menuId}
        role="menu"
        className={cn(
          'bg-background border-border absolute top-9 right-0 z-20 w-28 overflow-hidden rounded-md border py-1 shadow-sm',
        )}
      >
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            className={cn(
              'hover:bg-accent w-full px-3 py-2 text-left text-sm',
              item.variant === 'danger' ? 'text-destructive' : 'text-foreground',
            )}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
