import { SignUpProfileForm } from '@/features/auth';
import { cn } from '@/shared/lib';

export function SignUpProfilePage() {
  return (
    <div className={cn('bg-background flex min-h-screen justify-center px-4 pt-20')}>
      <div className={cn('w-full max-w-md space-y-8')}>
        <div className={cn('mb-6 flex w-full justify-start')}></div>
        <div className={cn('text-center')}>
          <h1 className={cn('text-foreground mb-2 text-3xl font-bold')}>프로필 설정</h1>
          <p className={cn('text-muted-foreground text-sm')}>나중에 언제든지 변경할 수 있습니다.</p>
        </div>
        <SignUpProfileForm />
      </div>
    </div>
  );
}
