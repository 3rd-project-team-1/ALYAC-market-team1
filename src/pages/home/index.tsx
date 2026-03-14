import { Helmet } from 'react-helmet-async';

import { SelectionScreen, SplashScreen, useSplashTimer } from '@/features/home';
import { cn } from '@/shared/lib';
import { FRONTEND_URL } from '@/shared/routes';

export function HomePage() {
  const viewMode = useSplashTimer();

  return (
    <>
      <Helmet>
        <title>Alyac Market | 소셜과 쇼핑의 만남</title>
        <link rel="canonical" href={`${FRONTEND_URL}/`} />
        <meta
          name="description"
          content="상품을 찾고 공유하는 소셜 커머스, Alyac Market에 오신 것을 환영합니다. 지금 가입하고 새로운 쇼핑 경험을 시작하세요."
        />
        <meta property="og:title" content="Alyac Market | 소셜과 쇼핑의 만남" />
        <meta
          property="og:description"
          content="나만의 쇼핑 피드를 구성하고 친구들과 공유해 보세요!"
        />
      </Helmet>

      <main
        className={cn(
          'flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ease-in-out',
          viewMode === 'splash' ? 'bg-white' : 'bg-[#1EC800]',
        )}
      >
        {viewMode === 'splash' ? <SplashScreen /> : <SelectionScreen />}
      </main>
    </>
  );
}
