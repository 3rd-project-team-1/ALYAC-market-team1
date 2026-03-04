import { useSignUpEmailForm } from '@/features/auth';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { FormField } from '@/shared/ui';

export function SignUpEmailForm() {
  const { register, handleSubmit, errors, isValid, onSubmit } = useSignUpEmailForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <FormField
          type="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          register={register('email')}
          error={errors.email}
        />
      </div>

      <div className="space-y-2">
        <FormField
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          autoComplete="current-password"
          register={register('password')}
          error={errors.password}
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid}
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
        다음
      </Button>
    </form>
  );
}
