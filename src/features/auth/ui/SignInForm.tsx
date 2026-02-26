import { useSignInForm } from '@/features/auth';
import { cn } from '@/shared/lib/utils';
import { FormField } from '@/shared/ui/FormField';
import { Button } from '@/shared/ui/button';

export function SignInForm() {
  const { register, handleSubmit, errors, isValid, isPending, onSubmit } = useSignInForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* --- 이메일 필드 --- */}
      <div className="space-y-2">
        <FormField
          type="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          register={register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.',
            },
          })}
          error={errors.email}
        />
      </div>

      {/* --- 비밀번호 필드 --- */}
      <div className="space-y-2">
        <FormField
          type="password"
          label="비밀번호"
          autoComplete="current-password"
          placeholder="비밀번호를 입력해 주세요."
          register={register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
          })}
          error={errors.password}
        />
      </div>

      {/* --- 로그인 버튼 --- */}
      <Button
        type="submit"
        //  조건이 안 맞거나 API 로딩 중일 때 비활성화
        disabled={!isValid || isPending}
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
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
