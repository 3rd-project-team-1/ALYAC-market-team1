import { useQuery } from '@tanstack/react-query';

import { getFollowers } from '../api/getFollowers';
import { userQueryKeys } from '../api/queryKeys';

export function useFollowerList(accountname?: string) {
  const { data, isLoading } = useQuery({
    queryKey: userQueryKeys.followers(accountname),
    queryFn: () => getFollowers(accountname!).then((res) => res.follower),
    enabled: !!accountname,
  });

  return { followers: data ?? [], isLoading };
}
