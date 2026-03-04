import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface TopBasicNavProps {
  moreMenu?: React.ReactNode;
  modal?: React.ReactNode;
}

export function TopBasicNav({ moreMenu, modal }: TopBasicNavProps) {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={cn(
          'bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4',
        )}
      >
        <button
          onClick={() => navigate(-1)}
          className={cn(
            'text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors',
          )}
        >
          <BackIcon />
        </button>

        {moreMenu}
      </header>

      {modal}
    </>
  );
}
