import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useSignIn } from '@/entities/auth';

export interface SignInFormData {
  email: string;
  password: string;
}

export const useSignInForm = () => {
  const navigate = useNavigate();
  const loginMutation = useSignIn();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: SignInFormData) => {
    loginMutation.mutate(
      { user: data },
      {
        onSuccess: () => navigate('/feed'),
        onError: (error) => {
          if (axios.isAxiosError<{ message: string }>(error)) {
            const errorMessage =
              error.response?.data?.message || '이메일 또는 비밀번호가 일치하지 않습니다.';
            setError('email', { message: '' });
            setError('password', { message: errorMessage });
          } else {
            toast.error('알 수 없는 오류가 발생했습니다.');
            console.error(error);
          }
        },
      },
    );
  };
  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isPending: loginMutation.isPending,
    onSubmit,
  };
};
