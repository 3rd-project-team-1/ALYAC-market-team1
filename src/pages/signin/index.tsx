import { SignInForm } from '@/features/auth/ui/SignInForm';

export function SignInPage() {
  return (
    // 화면 전체(h-screen)를 차지하고, 내용을 정중앙에 배치하는 Tailwind 속성입니다.
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>
        <SignInForm />
      </div>
    </div>
  );
}
