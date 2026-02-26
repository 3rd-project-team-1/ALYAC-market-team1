import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api';

interface UseProfileFollowParams {
  accountname?: string;
  initialIsFollow?: boolean;
}

export function useProfileFollow({ accountname, initialIsFollow }: UseProfileFollowParams) {
  const queryClient = useQueryClient();
  const [optimisticFollowing, setOptimisticFollowing] = useState<boolean | null>(null);

  const isFollowing = optimisticFollowing ?? initialIsFollow ?? false;

  const followMutation = useMutation({
    mutationFn: () => {
      if (!accountname) {
        throw new Error('accountname is required');
      }

      return isFollowing ? userApi.unfollow(accountname) : userApi.follow(accountname);
    },
    onMutate: () => {
      setOptimisticFollowing((prev) => !(prev ?? initialIsFollow ?? false));
    },
    onSuccess: () => {
      setOptimisticFollowing(null);
      queryClient.invalidateQueries({ queryKey: ['profile', accountname] });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });

  return { isFollowing, followMutation };
}
