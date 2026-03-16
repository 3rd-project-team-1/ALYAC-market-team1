import { Helmet } from 'react-helmet-async';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { ProfilePostsSection, ProfileProductsSection, ProfileTopSection } from '@/features/profile';
import { useProfileTargetAccount } from '@/features/profile/hooks/useProfileTargetAccount';
import { cn } from '@/shared/lib';
import { FRONTEND_URL, ROUTE_PATHS } from '@/shared/routes';
import { LoadingSpinner } from '@/shared/ui';
import { TopBasicNav, useLogoutMenu } from '@/widgets/top-basic-nav';

export function ProfilePage() {
  const { moreMenu, modal } = useLogoutMenu();
  const { targetAccountname } = useProfileTargetAccount();
  const { isLoading, data: profile } = useProfile(targetAccountname ?? undefined);

  if (isLoading) {
    return <LoadingSpinner fullScreen message="프로필을 불러오는 중..." />;
  }
  const userName = profile?.username || targetAccountname || '사용자';
  const profileAccountname = targetAccountname || profile?.accountname || '';
  return (
    <>
      <Helmet>
        <title>{`${userName} 님의 프로필 | Alyac Market`}</title>
        <link
          rel="canonical"
          href={`${FRONTEND_URL}${
            profileAccountname
              ? ROUTE_PATHS.PROFILE_DETAIL(profileAccountname)
              : ROUTE_PATHS.PROFILE
          }`}
        />
        {/* 소셜 공유용 OG 태그
        <meta property="og:title" content={`${userName} 님의 프로필`} />
        <meta property="og:description" content="로그인하고 프로필을 확인해보세요" />
        <meta property="og:image" content={profile?.image || `${FRONTEND_URL}/og-image.webp`} />
        <meta
          property="og:url"
          content={`${FRONTEND_URL}${
            profileAccountname
              ? ROUTE_PATHS.PROFILE_DETAIL(profileAccountname)
              : ROUTE_PATHS.PROFILE
          }`}
        /> */}
      </Helmet>

      <TopBasicNav moreMenu={moreMenu} modal={modal} />

      <main className={cn('pb-20')}>
        <h1 className="sr-only">{userName} 님의 프로필 페이지</h1>

        <section aria-label="프로필 요약">
          <ProfileTopSection />
        </section>

        <section aria-label="판매 중인 상품 리스트">
          <ProfileProductsSection />
        </section>

        <section aria-label="작성한 게시글 리스트">
          <ProfilePostsSection />
        </section>
      </main>
    </>
  );
}
