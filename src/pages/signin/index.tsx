import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth/ui/SignInForm';

export function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-start pt-20">
      <div className="flex w-full max-w-md flex-col space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>
        <SignInForm />
        <div className="text-center">
          <Link
            to="/signup"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
