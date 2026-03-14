import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';

export function SignInPage() {
  return (
    <main
      className={cn(
        'bg-background flex min-h-screen flex-col items-center justify-start px-4 pt-20',
      )}
    >
      <section className={cn('flex w-full max-w-md flex-col space-y-8')}>
        <header className={cn('text-center')}>
          <h1 className={cn('text-foreground text-3xl font-bold')}>로그인</h1>
        </header>
        <SignInForm />
        <nav aria-label="회원가입" className={cn('text-center')}>
          <Link
            to={ROUTE_PATHS.SIGNUP}
            className={cn(
              'text-muted-foreground hover:text-foreground text-sm transition-colors',
              'focus-visible:ring-primary-green rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            )}
          >
            이메일로 회원가입
          </Link>
        </nav>
      </section>
    </main>
  );
}
