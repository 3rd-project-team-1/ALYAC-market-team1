import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { useLoginMutation } from '../api/useAuthMutaion';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const navigate = useNavigate(); // 라우팅을 위한 훅
  const loginMutation = useLoginMutation(); // 로그인 API 호출을 위한 커스텀 훅

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: SignInFormData) => {
    loginMutation.mutate(
      { user: data },
      {
        onSuccess: () => {
          navigate('/'); // 로그인 성공 시 홈으로 이동
        },
        onError: (error) => {
          alert('로그인 실패: ' + error.message); // 로그인 실패 시 에러 메시지 표시
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex w-full flex-col">
      {/* --- 이메일 필드 --- */}
      <div className="mb-6">
        <Label htmlFor="email" className="text-[13px] font-normal text-gray-500">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.',
            },
          })}
          className={cn(
            'h-auto rounded-none border-x-0 border-t-0 border-b border-gray-200 px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#1EC800] focus-visible:ring-0',
            errors.email ? 'border-red-500' : '',
          )}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* --- 비밀번호 필드 --- */}
      <div className="mb-10">
        <Label htmlFor="password" className="text-[13px] font-normal text-gray-500">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
          })}
          className={cn(
            'h-auto rounded-none border-x-0 border-t-0 border-b border-gray-200 px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#1EC800] focus-visible:ring-0',
            errors.password ? 'border-red-500' : '',
          )}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* --- 로그인 버튼 --- */}
      <Button
        type="submit"
        className="w-full rounded-full border-none bg-[#A6E265] py-6 text-base font-bold text-white shadow-none hover:bg-[#91ce51]"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
