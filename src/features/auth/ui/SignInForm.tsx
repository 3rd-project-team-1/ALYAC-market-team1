import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSignIn } from '@/entities/auth/hooks/useSignIn';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const navigate = useNavigate();
  const loginMutation = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // ✅ isValid를 가져옵니다 (조건 충족 여부 boolean)
  } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange', // ✅ 입력할 때마다 실시간으로 유효성 검사를 실행합니다!
  });

  const onSubmit = (data: SignInFormData) => {
    loginMutation.mutate(
      { user: data },
      {
        onSuccess: () => navigate('/feed'),
        onError: (error) => {
          //  타입 가드: "이 에러가 통신하다가 발생한 Axios 에러가 맞아?" 라고 검사
          if (axios.isAxiosError<{ message: string }>(error)) {
            const errorMessage =
              error.response?.data?.message || '이메일 또는 비밀번호가 일치하지 않습니다.';
            alert(errorMessage);
          } else {
            // 통신 에러가 아니라 다른 에러(예: 문법 에러, 네트워크 끊김 등)일 경우
            alert('알 수 없는 오류가 발생했습니다.');
            console.error(error);
          }
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
            'mt-1.5 h-auto rounded-md border-none bg-[#F0F4FF] px-4 py-3 text-base shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-[#1EC800]',
            errors.email ? 'ring-1 ring-red-500' : '',
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
            // 마지막 사진 시안에 맞춘 디자인 (연한 파란색 둥근 배경)
            'mt-1.5 h-auto rounded-md border-none bg-[#F0F4FF] px-4 py-3 text-base shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-[#1EC800]',
            errors.password ? 'ring-1 ring-red-500' : '',
          )}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* --- 로그인 버튼 --- */}
      <Button
        type="submit"
        // ✅ 조건이 안 맞거나( !isValid ), API 로딩 중일 때 비활성화
        disabled={!isValid || loginMutation.isPending}
        className={cn(
          'w-full rounded-full border-none py-6 text-base font-bold text-white shadow-none transition-colors',
          // ✅ isValid 상태에 따라 색상 변경!
          isValid
            ? 'bg-[#6BCB26] hover:bg-[#5CB020]' // 조건 충족 시: 활기찬 연두색
            : 'cursor-not-allowed bg-[#D9D9D9] text-gray-400', // 조건 불충족 시: 회색
        )}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
