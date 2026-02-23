import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { checkEmailDuplicate } from '@/entities/auth/api/signup';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface EmailFormData {
  email: string;
  password: string;
}

export function SignUpEmailForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: EmailFormData) => {
    const isDuplicate = await checkEmailDuplicate(data.email);
    if (isDuplicate) {
      setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다.' });
      return;
    }
    navigate('/signup/profile', { state: { email: data.email, password: data.password } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground block text-sm font-medium">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일 주소를 입력해 주세요."
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.',
            },
          })}
          className={cn(
            'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            // errors.email && 'border-red-500',
          )}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground block text-sm font-medium">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 설정해 주세요."
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
          })}
          className={cn(
            'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            // errors.password && 'border-red-500',
          )}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={cn(
          'ring-offset-background focus-visible:ring-ring inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#6FCA3C] px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#6FCA3C] [&_svg]:pointer-events-none [&_svg]:shrink-0',
          // isValid ? 'bg-[#6BCB26] hover:bg-[#5CB020]' : 'bg-[#D9D9D9] text-gray-400',
        )}
      >
        다음
      </Button>
    </form>
  );
}
