import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { checkEmailDuplicate } from '@/entities/auth/';

export interface EmailFormData {
  email: string;
  password: string;
}

export function useSignUpEmailForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    mode: 'onChange',
  });
  const onSubmit = async (data: EmailFormData) => {
    const isDuplicate = await checkEmailDuplicate(data.email);
    if (isDuplicate) {
      setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다.' });
      return;
    }
    navigate('/signup/profile', { state: { email: data.email, password: data.password } });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
  };
}
