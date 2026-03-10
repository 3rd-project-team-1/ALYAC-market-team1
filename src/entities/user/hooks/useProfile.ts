import { useQuery } from '@tanstack/react-query';

import { getTokenUserInfo } from '@/shared/lib/utils/token';

import { getProfile } from '../api/getProfile';
import { userQueryKeys } from '../model/queryKeys';

export function useProfile(accountname?: string) {
  const tokenInfo = getTokenUserInfo();
  const myAccountname =
    tokenInfo?.accountname?.replace(/^@/, '').trim() ??
    tokenInfo?.account?.replace(/^@/, '').trim() ??
    tokenInfo?.id?.replace(/^@/, '').trim() ??
    null;

  const targetAccountname = accountname?.replace(/^@/, '').trim() ?? myAccountname ?? '';

  return useQuery({
    queryKey: userQueryKeys.profile(targetAccountname),
    queryFn: () => getProfile(targetAccountname).then((res) => res.profile),
    enabled: !!targetAccountname,
  });
}
