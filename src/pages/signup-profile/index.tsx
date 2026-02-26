import { SignUpProfileForm } from '@/features/auth';

export function SignUpProfilePage() {
  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="mb-6 flex w-full justify-start"></div>
        <div className="text-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">프로필 설정</h1>
          <p className="text-muted-foreground text-sm">나중에 언제든지 변경할 수 있습니다.</p>
        </div>
        <SignUpProfileForm />
      </div>
    </div>
  );
}
