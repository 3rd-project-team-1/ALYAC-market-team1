import { useQuery } from '@tanstack/react-query';

import { getFollowing } from '../api/getFollowing';
import { userQueryKeys } from '../api/queryKeys';

export function useFollowingList(accountname?: string) {
  const { data, isLoading } = useQuery({
    queryKey: userQueryKeys.followings(accountname),
    queryFn: () => getFollowing(accountname!).then((res) => res.following),
    enabled: !!accountname,
  });

  return { followings: data ?? [], isLoading };
}
