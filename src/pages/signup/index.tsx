import { SignUpEmailForm } from '@/features/auth';

export function SignUpPage() {
  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="mb-6 flex w-full justify-start"></div>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold">이메일로 회원가입</h2>
        </div>
        <SignUpEmailForm />
      </div>
    </div>
  );
}
