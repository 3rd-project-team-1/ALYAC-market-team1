import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';

interface TopBasicNavProps {
  moreMenu?: React.ReactNode;
  modal?: React.ReactNode;
}

export function TopBasicNav({ moreMenu, modal }: TopBasicNavProps) {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors"
        >
          <BackIcon />
        </button>

        {moreMenu}
      </header>

      {modal}
    </>
  );
}
