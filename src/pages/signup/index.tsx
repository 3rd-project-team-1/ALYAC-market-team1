import { SignUpEmailForm } from '@/features/auth/ui/SignUpEmailForm';

export function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-8 pt-6 pb-16">
      <div className="animate-in slide-in-from-right-8 fade-in flex w-full max-w-sm flex-col duration-500">
        <div className="mb-6 flex w-full justify-start"></div>

        {/* 타이틀 */}
        <div className="mb-8 text-center">
          <h2 className="text-[30px] font-bold text-gray-900">이메일로 회원가입</h2>
        </div>

        <SignUpEmailForm />
      </div>
    </div>
  );
}
