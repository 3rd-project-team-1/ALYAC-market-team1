import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

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
        <Button variant="icon-nav" size="nav" onClick={() => navigate(-1)}>
          <BackIcon />
        </Button>

        {moreMenu}
      </header>

      {modal}
    </>
  );
}
