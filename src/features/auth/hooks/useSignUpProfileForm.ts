import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { SignupRequest, useCheckAccountnameDuplicate, useSignUp } from '@/entities/auth';
import { useImageUpload } from '@/shared/hooks';
import { handleApiError } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';

import { type SignupProfileInput, signupProfileSchema } from '../model/signup.schema';

export function useSignUpProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpMutation = useSignUp();
  const checkAccountMutation = useCheckAccountnameDuplicate();

  const { email, password } = location.state || {};
  // 이미지 업로드 훅 사용 (로직 분리)
  const { handleFileChange, upload: uploadImage } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false); //  중복 방지

  useEffect(() => {
    if (!email || !password) {
      alert('잘못된 접근입니다. 이메일부터 다시 입력해 주세요.');
      navigate(ROUTE_PATHS.SIGNUP);
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
      // 계정 ID 중복 체크
      const isDuplicate = await checkAccountMutation.mutateAsync(data.accountname);

      if (isDuplicate) {
        setError('accountname', { type: 'manual', message: '이미 사용 중인 ID입니다.' });
        setIsSubmitting(false);
        return;
      }

      // 이미지 업로드 실행
      const finalImageValue = await uploadImage();

      //  회원가입 요청
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
      navigate(ROUTE_PATHS.SIGNIN);
    } catch (error) {
      handleApiError(error, '회원가입에 실패했습니다.');
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
    setProfileImageFile: handleFileChange, // 이름 맞춰주기
    isPending: isSubmitting,
  };
}
