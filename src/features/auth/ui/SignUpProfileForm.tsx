import { useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { checkAccountnameDuplicate } from '@/entities/auth/api/signup';
import { useSignUp } from '@/entities/auth/hooks/useSignUp';
import { ApiErrorResponse, SignupRequest } from '@/entities/user/types';
import uploadimage from '@/shared/assets/icons/upload-image.svg';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { ProfileImageUploader } from './ProfileImageUploader';

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
    let finalImageUrl = uploadimage; // 기본값: 기본 이미지

    if (profileImageFile) {
      // 사용자가 업로드한 파일이 있다면 Base64로 변환
      finalImageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(profileImageFile);
      });
    }
    const requestData: SignupRequest = {
      user: {
        email,
        password,
        username: data.username,
        accountname: data.accountname,
        intro: data.intro || '안녕하세요! 반갑습니다.',
        image: finalImageUrl,
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
        <Label htmlFor="username" className="text-foreground block text-sm font-medium">
          사용자 이름
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="2~10자 이내여야 합니다."
          {...register('username', {
            required: '사용자 이름을 입력해주세요.',
            minLength: { value: 2, message: '2자 이상 입력해주세요.' },
            maxLength: { value: 10, message: '10자 이하로 입력해주세요.' },
          })}
          className={cn(
            'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            errors.username && 'border-red-500',
          )}
        />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountname" className="text-foreground block text-sm font-medium">
          계정 ID
        </Label>
        <Input
          id="accountname"
          type="text"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          {...register('accountname', {
            required: '계정 ID를 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._]+$/,
              message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
            },
          })}
          className={cn(
            'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            errors.accountname && 'border-red-500',
          )}
        />
        {errors.accountname && <p className="text-sm text-red-500">{errors.accountname.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="intro" className="text-foreground block text-sm font-medium">
          소개
        </Label>
        <Input
          id="intro"
          type="text"
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          {...register('intro', { required: '필수', maxLength: 100 })}
          className={cn(
            'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            errors.intro && 'border-red-500',
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={!isValid || signUpMutation.isPending}
        className={cn(
          'ring-offset-background focus-visible:ring-ring inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#6FCA3C] px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#6FCA3C] [&_svg]:pointer-events-none [&_svg]:shrink-0',
          // isValid ? 'bg-[#6BCB26] hover:bg-[#5CB020]' : 'bg-[#D9D9D9]',
        )}
      >
        {signUpMutation.isPending ? '처리 중...' : '알약마켓 시작하기'}
      </Button>
    </form>
  );
}
