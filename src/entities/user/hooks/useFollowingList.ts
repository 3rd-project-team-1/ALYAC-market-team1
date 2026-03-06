import { useQuery } from '@tanstack/react-query';

import { getFollowing } from '../api/getFollowing';

export function useFollowingList(accountname?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['followings', accountname],
    queryFn: () => getFollowing(accountname!).then((res) => res.following),
    enabled: !!accountname,
  });

  return { followings: data ?? [], isLoading };
}
