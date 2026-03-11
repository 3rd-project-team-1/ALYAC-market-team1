import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCheckEmailDuplicate } from '@/entities/auth';
import { ROUTE_PATHS } from '@/shared/routes';

import { type SignupEmailInput, signupEmailSchema } from '../model/signup.schema';

export function useSignUpEmailForm() {
  const navigate = useNavigate();
  const checkEmailMutation = useCheckEmailDuplicate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupEmailInput>({
    resolver: zodResolver(signupEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SignupEmailInput) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (isDuplicate) => {
        if (isDuplicate) {
          setError('email', {
            type: 'manual',
            message: '이미 가입된 이메일 주소입니다.',
          });
        } else {
          // 중복 아니면 다음 단계로
          navigate(ROUTE_PATHS.SIGNUP_PROFILE, {
            state: { email: data.email, password: data.password },
          });
        }
      },
      onError: (error) => {
        toast.error('이메일 확인 중 오류가 발생했습니다.');
        console.error(error);
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isChecking: checkEmailMutation.isPending,
    onSubmit,
  };
}
