import { useState } from 'react';

import { MoreIcon } from '@/shared/assets';

interface MenuItem {
  label: React.ReactNode;
  onClick: () => void;
}

interface MoreMenuProps {
  items: MenuItem[];
}

export function MoreMenu({ items }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-foreground hover:bg-accent flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors"
      >
        <MoreIcon />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="bg-background absolute top-10 right-0 z-20 w-44 overflow-hidden rounded-lg py-2 shadow-lg">
            {items.map((item, idx) => (
              <button
                key={idx}
                className="text-foreground hover:bg-accent flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm"
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
