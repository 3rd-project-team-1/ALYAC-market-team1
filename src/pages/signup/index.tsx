import { SignUpEmailForm } from '@/features/auth';
import { cn } from '@/shared/lib';

export function SignUpPage() {
  return (
    <div className={cn('bg-background flex min-h-screen justify-center px-4 pt-20')}>
      <div className={cn('w-full max-w-md space-y-8')}>
        <div className={cn('mb-6 flex w-full justify-start')}></div>
        <div className={cn('text-center')}>
          <h2 className={cn('text-foreground text-3xl font-bold')}>이메일로 회원가입</h2>
        </div>
        <SignUpEmailForm />
      </div>
    </div>
  );
}
