import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';

export function useFollowingList(accountname?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['followings', accountname],
    queryFn: () => userApi.getFollowings(accountname!).then((res) => res.data.following),
    enabled: !!accountname,
  });

  return { followings: (data ?? []) as Profile[], isLoading };
}
