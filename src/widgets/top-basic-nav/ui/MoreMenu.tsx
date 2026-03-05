import { useState } from 'react';

import { MoreIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface MenuItem {
  label: React.ReactNode;
  onClick: () => void;
}

interface MoreMenuProps {
  items?: MenuItem[];
  onClick?: () => void;
}

export function MoreMenu({ items, onClick }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={cn('relative')}>
      <button
        onClick={handleClick}
        className={cn(
          'text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors',
        )}
      >
        <MoreIcon />
      </button>

      {!onClick && isOpen && (
        <>
          <div className={cn('fixed inset-0 z-10')} onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'bg-background absolute top-10 right-0 z-20 w-44 overflow-hidden rounded-lg py-2 shadow-lg',
            )}
          >
            {items?.map((item, idx) => (
              <button
                key={idx}
                className={cn(
                  'text-foreground hover:bg-accent flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm',
                )}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
