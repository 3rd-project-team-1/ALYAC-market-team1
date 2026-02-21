import { useEffect } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSignUp } from '@/entities/auth/hooks/useSignUp';
import { ApiErrorResponse, SignupRequest } from '@/entities/user/types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface ProfileFormData {
  username: string;
  accountname: string;
  intro: string;
}

export function SignUpProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpMutation = useSignUp();

  const { email, password } = location.state || {};

  useEffect(() => {
    if (!email || !password) {
      alert('잘못된 접근입니다. 이메일부터 다시 입력해 주세요.');
      navigate('/signup');
    }
  }, [email, password, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({ mode: 'onChange' });

  const onSubmit = (data: ProfileFormData) => {
    const requestData: SignupRequest = {
      user: {
        email,
        password,
        username: data.username,
        accountname: data.accountname,
        intro: data.intro || '안녕하세요! 반갑습니다.',
        image: 'https://api.mandarin.weniv.co.kr/1687141773353.png',
      },
    };

    signUpMutation.mutate(requestData, {
      onSuccess: () => {
        alert('회원가입 완료!');
        navigate('/signin');
      },
      onError: (error) => {
        if (axios.isAxiosError<ApiErrorResponse>(error))
          alert(error.response?.data?.message || '실패했습니다.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex w-full flex-col">
      {/* 사용자 이름, 계정 ID, 소개 입력창 */}
      <div className="mb-4">
        <Label htmlFor="username" className="text-[13px] font-normal text-gray-500">
          사용자 이름
        </Label>
        <Input
          id="username"
          type="text"
          {...register('username', {
            required: '필수',
            minLength: { value: 2, message: '2자 이상' },
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 focus-visible:border-[#6BCB26]',
            errors.username && 'border-red-500',
          )}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="accountname" className="text-[13px] font-normal text-gray-500">
          계정 ID
        </Label>
        <Input
          id="accountname"
          type="text"
          {...register('accountname', { required: '필수', pattern: /^[a-zA-Z0-9._]+$/ })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 focus-visible:border-[#6BCB26]',
            errors.accountname && 'border-red-500',
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || signUpMutation.isPending}
        className={cn(
          'mt-4 w-full rounded-full py-6 text-base font-bold text-white',
          isValid ? 'bg-[#6BCB26] hover:bg-[#5CB020]' : 'bg-[#D9D9D9]',
        )}
      >
        {signUpMutation.isPending ? '처리 중...' : '알약마켓 시작하기'}
      </Button>
    </form>
  );
}
