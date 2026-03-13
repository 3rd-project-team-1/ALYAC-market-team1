import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { follow } from '../api/follow';
import { unfollow } from '../api/unfollow';

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
      if (!normalizedAccountname) throw new Error('accountname is required');
      return isFollowing ? unfollow(normalizedAccountname) : follow(normalizedAccountname);
    },
    onMutate: ({ isFollowing }: FollowMutationVariables) => {
      setOptimisticFollowing(!isFollowing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['followings'], refetchType: 'none' });
      queryClient.invalidateQueries({ queryKey: ['followers'], refetchType: 'none' });
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
