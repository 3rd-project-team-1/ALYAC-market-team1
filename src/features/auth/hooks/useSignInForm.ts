import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useSignIn } from '@/entities/auth';
import { ROUTE_PATHS } from '@/shared/routes';

import { type SigninInput, signinSchema } from '../model/signin.schema';

export const useSignInForm = () => {
  const navigate = useNavigate();
  const loginMutation = useSignIn();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      user: {
        email: '',
        password: '',
      },
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SigninInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate(ROUTE_PATHS.FEED),
      onError: (error) => {
        if (axios.isAxiosError<{ message: string }>(error)) {
          const errorMessage =
            error.response?.data?.message || '이메일 또는 비밀번호가 일치하지 않습니다.';
          setError('user.email', { message: '' });
          setError('user.password', { message: errorMessage });
        } else {
          toast.error('알 수 없는 오류가 발생했습니다.');
          console.error(error);
        }
      },
    });
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
