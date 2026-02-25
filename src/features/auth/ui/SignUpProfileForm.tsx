import { useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { checkAccountnameDuplicate, uploadProfileImage } from '@/entities/auth/';
import { useSignUp } from '@/entities/auth/hooks/useSignUp';
import { ApiErrorResponse, SignupRequest } from '@/entities/user/types';
import { ProfileImageUploader } from '@/features/profile/ui/ProfileImageUploader';
import { cn } from '@/shared/lib/utils';
import { FormField } from '@/shared/ui/FormField';
import { Button } from '@/shared/ui/button';

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
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  useEffect(() => {
    if (!email || !password) {
      alert('잘못된 접근입니다. 이메일부터 다시 입력해 주세요.');
      navigate('/signup');
    }
  }, [email, password, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({ mode: 'onChange' });

  const onSubmit = async (data: ProfileFormData) => {
    const isDuplicate = await checkAccountnameDuplicate(data.accountname);
    if (isDuplicate) {
      setError('accountname', { type: 'manual', message: '이미 사용 중인 ID입니다.' });
      return;
    }
    let finalImageValue = '';

    if (profileImageFile) {
      try {
        finalImageValue = await uploadProfileImage(profileImageFile);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('프로필 이미지 업로드에 실패했습니다.');
        return;
      }
    }
    const requestData: SignupRequest = {
      user: {
        email,
        password,
        username: data.username,
        accountname: data.accountname,
        intro: data.intro || '안녕하세요! 반갑습니다.',
        image: finalImageValue,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProfileImageUploader onImageChange={(file) => setProfileImageFile(file)} />
      {/* 사용자 이름, 계정 ID, 소개 입력창 */}
      <div className="space-y-2">
        <FormField
          type="text"
          label="사용자 이름"
          placeholder="2~10자 이내여야 합니다."
          register={register('username', {
            required: '사용자 이름을 입력해주세요.',
            minLength: { value: 2, message: '2자 이상 입력해주세요.' },
            maxLength: { value: 10, message: '10자 이하로 입력해주세요.' },
          })}
          error={errors.username}
        />
      </div>

      <div className="space-y-2">
        <FormField
          type="text"
          label="계정 ID"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          register={register('accountname', {
            required: '계정 ID를 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._]+$/,
              message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
            },
          })}
          error={errors.accountname}
        />
      </div>

      <div className="space-y-2">
        <FormField
          type="text"
          label="소개"
          readonly={true}
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          register={register('intro', { required: '필수', maxLength: 60 })}
          error={errors.intro}
        />
      </div>
      <Button
        type="submit"
        disabled={!isValid || signUpMutation.isPending}
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
          isValid
            ? 'bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-green-hover)] active:bg-[var(--color-primary-green-hover)]'
            : 'cursor-not-allowed bg-[var(--color-primary-green-light)] text-white',
        )}
      >
        {signUpMutation.isPending ? '처리 중...' : '알약마켓 시작하기'}
      </Button>
    </form>
  );
}
