import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveToken } from '@/shared/lib';

import { signIn } from '../api/signin';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // 로그인 성공 시 로컬 스토리지에 토큰 저장
      saveToken(data.user.accessToken, data.user.refreshToken);
      localStorage.setItem('lastUserId', data.user._id);
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};
