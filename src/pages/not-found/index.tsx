import { Link } from 'react-router-dom';

import { FullLogoAlyac404Icon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/router';
import { Button } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <main className={cn('flex h-screen flex-col items-center justify-center')}>
      <FullLogoAlyac404Icon className={cn('size-100')} />
      <p className={cn('mb-8 text-gray-500')}>요청하신 페이지를 찾을 수 없습니다. 😢</p>
      <Link to={ROUTE_PATHS.SEARCH}>
        <Button variant="outline">뒤로 돌아가기</Button>
      </Link>
    </main>
  );
}
