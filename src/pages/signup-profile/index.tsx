import { Helmet } from 'react-helmet-async';

import { SignUpProfileForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { FRONTEND_URL, ROUTE_PATHS } from '@/shared/routes';

export function SignUpProfilePage() {
  return (
    <>
      <Helmet>
        <title>프로필 설정 | 회원가입 | Alyac Market</title>
        <link rel="canonical" href={`${FRONTEND_URL}${ROUTE_PATHS.SIGNUP_PROFILE}`} />
        <meta
          name="description"
          content="Alyac Market에서 사용할 나만의 프로필을 설정하세요. 개성 있는 닉네임과 이미지로 소통을 시작할 수 있습니다."
        />
        <meta property="og:title" content="프로필 설정 | 회원가입 | Alyac Market" />
      </Helmet>

      <main className={cn('bg-background flex min-h-screen justify-center px-4 pt-20')}>
        <section className={cn('w-full max-w-md space-y-8')}>
          <div className={cn('mb-6 flex w-full justify-start')}></div>
          <div className={cn('text-center')}>
            <h1 className={cn('text-foreground mb-2 text-3xl font-bold')}>프로필 설정</h1>
          </div>
          <SignUpProfileForm />
        </section>
      </main>
    </>
  );
}
