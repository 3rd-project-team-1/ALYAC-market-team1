import { useQuery } from '@tanstack/react-query';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';

export function useProfile(accountname?: string) {
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  // 조회할 accountname 결정
  const targetAccountname = accountname ?? myAccountname ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['profile', targetAccountname],
    queryFn: () => userApi.getProfile(targetAccountname).then((res) => res.data.profile),
    enabled: !!targetAccountname,
  });

  const isMyProfile = accountname
    ? !!myAccountname && myAccountname === accountname
    : true;

  return { profile: data ?? null, isLoading, isMyProfile };
}
