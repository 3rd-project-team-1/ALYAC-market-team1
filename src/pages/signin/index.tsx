import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/router';

export function SignInPage() {
  return (
    <div
      className={cn(
        'bg-background flex min-h-screen flex-col items-center justify-start px-4 pt-20',
      )}
    >
      <div className={cn('flex w-full max-w-md flex-col space-y-8')}>
        <div className={cn('text-center')}>
          <h1 className={cn('text-foreground text-3xl font-bold')}>로그인</h1>
        </div>
        <SignInForm />
        <div className={cn('text-center')}>
          <Link
            to={ROUTE_PATHS.SIGNUP}
            className={cn('text-muted-foreground hover:text-foreground text-sm transition-colors')}
          >
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
