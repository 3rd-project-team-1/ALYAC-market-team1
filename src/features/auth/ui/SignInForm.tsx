import { useSignInForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { Button, FormField } from '@/shared/ui';

export function SignInForm() {
  const { register, handleSubmit, errors, isValid, isPending, onSubmit } = useSignInForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6')}>
      {/* --- 이메일 필드 --- */}
      <div className={cn('space-y-2')}>
        <FormField
          type="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          register={register('user.email')}
          error={errors.user?.email}
        />
      </div>

      {/* --- 비밀번호 필드 --- */}
      <div className={cn('space-y-2')}>
        <FormField
          type="password"
          label="비밀번호"
          autoComplete="current-password"
          placeholder="비밀번호를 입력해 주세요."
          register={register('user.password')}
          error={errors.user?.password}
        />
      </div>

      {/* --- 로그인 버튼 --- */}
      <Button
        type="submit"
        //  조건이 안 맞거나 API 로딩 중일 때 비활성화
        disabled={!isValid || isPending}
        className={cn(
          'inline-flex h-14 w-full items-center justify-center gap-2 px-4 py-2',
          'text-base font-semibold whitespace-nowrap text-white',
          'cursor-pointer rounded-full transition-colors',
          'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          '[&_svg]:pointer-events-none [&_svg]:shrink-0',
          isValid
            ? 'bg-primary-green hover:bg-primary-green-hover active:bg-primary-green-hover'
            : 'bg-primary-green-light cursor-not-allowed text-white',
        )}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
