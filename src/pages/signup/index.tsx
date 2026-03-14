import { Helmet } from 'react-helmet-async';

import { SignUpEmailForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { FRONTEND_URL, ROUTE_PATHS } from '@/shared/routes';

export function SignUpPage() {
  return (
    <>
      {/* Helmet 설정 추가 */}
      <Helmet>
        <title>이메일 설정 | 회원가입 | Alyac Market</title>
        <link rel="canonical" href={`${FRONTEND_URL}${ROUTE_PATHS.SIGNUP}`} />
        <meta
          name="description"
          content="Alyac Market의 가족이 되어 소셜과 쇼핑을 결합한 새로운 커머스 경험을 시작하세요."
        />
        <meta property="og:title" content="이메일 설정 | 회원가입 | Alyac Market" />
      </Helmet>
      <main className={cn('bg-background flex min-h-screen justify-center px-4 pt-20')}>
        <section className={cn('w-full max-w-md space-y-8')}>
          <div className={cn('text-center')}>
            <h1 className={cn('text-foreground text-3xl font-bold')}>이메일로 회원가입</h1>
          </div>
          <SignUpEmailForm />
        </section>
      </main>
    </>
  );
}
