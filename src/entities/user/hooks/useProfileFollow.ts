import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { follow } from '../api/follow';
import { userQueryKeys } from '../api/queryKeys';
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
      // optimistic 상태 유지 (null로 리셋하지 않음)
      // 프로필 카운트 즉시 갱신
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
      // 목록은 stale 처리만 (즉시 refetch 안 함 → 뒤로가기/탭 이동/새로고침 시 반영)
      queryClient.invalidateQueries({ queryKey: userQueryKeys.followings(), refetchType: 'none' });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.followers(), refetchType: 'none' });
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
