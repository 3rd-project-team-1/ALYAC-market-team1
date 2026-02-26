import { useMutation } from '@tanstack/react-query';

import { signIn } from '../api/signin';
import { saveToken } from '../lib/token';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // 로그인 성공 시 로컬 스토리지에 토큰 저장
      saveToken(data.user.accessToken, data.user.refreshToken);
      localStorage.setItem('lastUserId', data.user._id);
    },
  });
};
