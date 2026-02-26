import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';

export function useFollowerList(accountname?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['followers', accountname],
    queryFn: () => userApi.getFollowers(accountname!).then((res) => res.data.data),
    enabled: !!accountname,
  });

  return { followers: (data ?? []) as Profile[], isLoading };
}
