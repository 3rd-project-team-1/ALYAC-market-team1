import { useState } from 'react';

import { MoreIcon, MoreSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface MenuItem {
  label: React.ReactNode;
  onClick: () => void;
  preventClose?: boolean;
}

interface MoreMenuProps {
  items?: MenuItem[];
  onClick?: () => void;
  small?: boolean;
}

export function MoreMenu({ items, onClick, small = false }: MoreMenuProps) {
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
      <Button
        aria-label="더보기 메뉴"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        variant="icon-nav"
        size={small ? 'nav-sm' : 'nav'}
        onClick={handleClick}
      >
        {small ? <MoreSmallIcon aria-hidden="true" /> : <MoreIcon aria-hidden="true" />}
      </Button>

      {!onClick && isOpen && (
        <>
          <div className={cn('fixed inset-0 z-10')} onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'bg-background absolute top-10 right-0 z-20 w-44 overflow-hidden rounded-lg py-2 shadow-lg',
            )}
          >
            {items?.map((item, idx) => (
              <Button
                key={idx}
                role="menuitem"
                variant="ghost"
                className="w-full justify-start gap-2 px-4 py-2.5 text-sm has-[>svg]:px-4"
                onClick={() => {
                  item.onClick();
                  if (!item.preventClose) {
                    setIsOpen(false);
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
