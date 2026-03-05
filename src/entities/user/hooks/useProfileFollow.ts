import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api';

interface UseProfileFollowParams {
  initialIsFollow?: boolean;
}

interface FollowMutationVariables {
  accountname: string;
  isFollowing: boolean;
}

export function useProfileFollow({ initialIsFollow }: UseProfileFollowParams) {
  const queryClient = useQueryClient();
  const [optimisticFollowing, setOptimisticFollowing] = useState<boolean | null>(null);

  const isFollowing = optimisticFollowing ?? initialIsFollow ?? false;

  const followMutation = useMutation({
    mutationFn: ({ accountname, isFollowing }: FollowMutationVariables) => {
      const normalizedAccountname = accountname.replace(/^@/, '').trim();
      if (!normalizedAccountname) {
        throw new Error('accountname is required');
      }

      return isFollowing
        ? userApi.unfollow(normalizedAccountname)
        : userApi.follow(normalizedAccountname);
    },
    onMutate: ({ isFollowing }: FollowMutationVariables) => {
      setOptimisticFollowing(!isFollowing);
    },
    onSuccess: () => {
      // optimistic 상태 유지 (null로 리셋하지 않음)
      // 모든 profile, followings, followers 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
    onError: () => {
      // 에러 시에만 롤백
      setOptimisticFollowing(null);
    },
  });

  const toggleFollow = (accountname: string) => {
    followMutation.mutate({ accountname, isFollowing });
  };

  return { isFollowing, followMutation, toggleFollow };
}
