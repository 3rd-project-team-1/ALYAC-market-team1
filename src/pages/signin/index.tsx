import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth/ui/SignInForm';

export function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white px-8 pt-32">
      <div className="flex w-full max-w-sm flex-col pt-4">
        <div className="mb-6 text-center">
          <h2 className="text-[28px] font-bold tracking-tight text-gray-900">로그인</h2>
        </div>
        <SignInForm />
        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
          >
            이메일로 회원가입
          </Link>
        </div>
        <Link
          to="/"
          className="mt-8 text-center text-xs text-gray-300 underline underline-offset-2 hover:text-gray-500"
        >
          소셜 로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
