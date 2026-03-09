// features/auth/signup-profile/model/use-signup-profile-form.ts
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCheckAccountnameDuplicate, useSignUp } from '@/entities/auth';
import { ApiErrorResponse, SignupRequest } from '@/entities/user';
import { uploadSingleImage } from '@/shared/api';

import { type SignupProfileInput, signupProfileSchema } from '../model/signup.schema';

export function useSignUpProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpMutation = useSignUp();
  const checkAccountMutation = useCheckAccountnameDuplicate();

  const { email, password } = location.state || {};
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); //  중복 방지

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
  } = useForm<SignupProfileInput>({
    resolver: zodResolver(signupProfileSchema),
    defaultValues: {
      username: '',
      accountname: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupProfileInput) => {
    //  중복 실행 방지
    if (isSubmitting) {
      console.log('⚠️ 이미 처리 중입니다');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. 계정 ID 중복 체크
      const isDuplicate = await checkAccountMutation.mutateAsync(data.accountname);

      if (isDuplicate) {
        setError('accountname', { type: 'manual', message: '이미 사용 중인 ID입니다.' });
        setIsSubmitting(false);
        return;
      }

      // 2. 이미지 업로드
      let finalImageValue = '';
      if (profileImageFile) {
        try {
          finalImageValue = await uploadSingleImage(profileImageFile);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : '프로필 이미지 업로드에 실패했습니다.',
          );
          setIsSubmitting(false);
          return;
        }
      }

      // 3. 회원가입 요청
      const requestData: SignupRequest = {
        user: {
          email,
          password,
          username: data.username,
          accountname: data.accountname,
          intro: data.intro || '',
          image: finalImageValue,
        },
      };

      await signUpMutation.mutateAsync(requestData);

      toast.success('회원가입 완료! 🎉');
      navigate('/signin');
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.message || '회원가입에 실패했습니다.');
      } else {
        toast.error('오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    setProfileImageFile,
    isPending: isSubmitting,
  };
}
