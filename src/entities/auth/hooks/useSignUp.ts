import { useMutation } from '@tanstack/react-query';

import { signUp } from '../api/signup';

// 우리가 만든 회원가입 API 통신 함수

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
