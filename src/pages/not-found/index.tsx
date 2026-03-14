import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { FullLogoAlyac404Icon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { Button } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | Alyac Market</title>
        {/* 검색 결과에 이 페이지가 나오지 않도록 설정 */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className={cn('flex h-screen flex-col items-center justify-center')}>
        <FullLogoAlyac404Icon className={cn('size-100')} />
        <h1 className={cn('mb-8 text-base font-normal text-gray-500')}>
          요청하신 페이지를 찾을 수 없습니다. 😢
        </h1>
        <Link to={ROUTE_PATHS.SEARCH}>
          <Button variant="outline">뒤로 돌아가기</Button>
        </Link>
      </main>
    </>
  );
}
