import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: EmailFormData) => {
    navigate('/signup/profile', { state: { email: data.email, password: data.password } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex w-full flex-col">
      <div className="mb-4">
        <Label htmlFor="email" className="text-[13px] font-normal text-gray-500">
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
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.email && 'border-red-500',
          )}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-8">
        <Label htmlFor="password" className="text-[13px] font-normal text-gray-500">
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
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.password && 'border-red-500',
          )}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={cn(
          'w-full rounded-full py-6 text-base font-bold text-white',
          isValid ? 'bg-[#6BCB26] hover:bg-[#5CB020]' : 'bg-[#D9D9D9] text-gray-400',
        )}
      >
        다음
      </Button>
    </form>
  );
}
