import { useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { checkAccountnameDuplicate } from '@/entities/auth';
import { useSignUp } from '@/entities/auth';
import { ApiErrorResponse, SignupRequest } from '@/entities/user/types';
import { uploadSingleImage } from '@/shared/api';

export interface ProfileFormData {
  username: string;
  accountname: string;
  intro: string;
}

export function useSignUpProfileForm() {
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
        finalImageValue = await uploadSingleImage(profileImageFile);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : '프로필 이미지 업로드에 실패했습니다.',
        );
        return;
      }
    }

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

    signUpMutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('회원가입 완료! 🎉');
        navigate('/signin');
      },
      onError: (error) => {
        if (axios.isAxiosError<ApiErrorResponse>(error))
          toast.error(error.response?.data?.message || '실패했습니다.');
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    setProfileImageFile,
    isPending: signUpMutation.isPending,
  };
}
