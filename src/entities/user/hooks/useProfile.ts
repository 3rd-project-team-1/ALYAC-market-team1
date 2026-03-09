import { useQuery } from '@tanstack/react-query';

import { getTokenUserInfo } from '@/shared/lib/utils/token';

import { getProfile } from '../api/getProfile';

export function useProfile(accountname?: string) {
  const tokenInfo = getTokenUserInfo();
  const myAccountname =
    tokenInfo?.accountname?.replace(/^@/, '').trim() ??
    tokenInfo?.account?.replace(/^@/, '').trim() ??
    tokenInfo?.id?.replace(/^@/, '').trim() ??
    null;

  const normalizedAccountname = accountname?.replace(/^@/, '').trim();

  // 조회할 accountname 결정
  const targetAccountname = normalizedAccountname ?? myAccountname ?? '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', targetAccountname],
    queryFn: () => getProfile(targetAccountname).then((res) => res.profile),
    enabled: !!targetAccountname,
  });
  const isMyProfile = normalizedAccountname
    ? !!myAccountname && myAccountname === normalizedAccountname
    : true;

  return { profile: data ?? null, isLoading, isError, isMyProfile };
}
