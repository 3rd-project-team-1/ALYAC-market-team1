import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopBasicNavProps {
  moreMenu?: React.ReactNode;
  modal?: React.ReactNode;
}

export function TopBasicNav({ moreMenu, modal }: TopBasicNavProps) {
  const navigate = useNavigate();

  return (
    <>
      <TopHeaderLayout>
        <Button
          aria-label="이전 페이지로 돌아가기"
          variant="icon-nav"
          size="nav"
          onClick={() => navigate(-1)}
        >
          <BackIcon aria-hidden="true" />
        </Button>

        {moreMenu}
      </TopHeaderLayout>

      {modal}
    </>
  );
}
