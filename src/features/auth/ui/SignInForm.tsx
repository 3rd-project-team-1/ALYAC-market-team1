import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { useSignInForm } from '../hooks/useSignInForm';

export function SignInForm() {
  const { register, handleSubmit, errors, isValid, isPending, onSubmit } = useSignInForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* --- 이메일 필드 --- */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground block text-sm font-medium">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          // react-hook-form의 에러 상태를 컴포넌트에 전달
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.',
            },
          })}
        />
        {errors.email && <p className="text-destructive mt-1 text-sm">{errors.email.message}</p>}
      </div>

      {/* --- 비밀번호 필드 --- */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground block text-sm font-medium">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          // react-hook-form의 에러 상태를 컴포넌트에 전달
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
          })}
        />
        {errors.password && (
          <p className="text-destructive mt-1 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* --- 로그인 버튼 --- */}
      <Button
        type="submit"
        //  조건이 안 맞거나 API 로딩 중일 때 비활성화
        disabled={!isValid || isPending}
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
          //  isValid 상태에 따라 색상 변경
          isValid
            ? 'bg-[#6BCB26] hover:bg-[#5CB020]' // 조건 충족 시: 활기찬 연두색
            : 'cursor-not-allowed bg-[#A7FFB9] text-white', // 조건 불충족 시: 회색
        )}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
