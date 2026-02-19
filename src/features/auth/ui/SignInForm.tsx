import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
      {/* --- 이메일 입력 영역 --- */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          // register를 통해 React Hook Form에 이 Input을 등록하고 검사 규칙을 부여합니다.
          {...register('email', {
            required: '이메일을 입력해 주세요.', // 빈 값일 때의 에러 메시지
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 이메일 정규식
              message: '올바른 이메일 형식을 입력해 주세요.', // 정규식에 안 맞을 때의 에러 메시지
            },
          })}
          // 에러가 있다면 테두리를 빨간색(destructive)으로 변경하여 시각적 피드백 제공
          className={errors.email ? 'border-destructive' : ''}
        />
        {/* 이메일 관련 에러가 발생했다면 빨간색 안내 문구를 띄워줍니다. */}
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      {/* --- 비밀번호 입력 영역 --- */}
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: {
              value: 6, // 최소 6글자 이상
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          })}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
      </div>

      {/* --- 제출 버튼 --- */}
      {/* API 요청 중(isPending)일 때는 버튼을 비활성화(disabled)하여 '따닥' 중복 클릭을 방지합니다. */}
      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
