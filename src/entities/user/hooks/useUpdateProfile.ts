import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '../api/updateProfile';
import { userQueryKeys } from '../model/queryKeys';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      user: { username: string; accountname: string; intro: string; image: string };
    }) => updateProfile(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
    },
  });
}
