import { useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib';

export function useProfileTargetAccount() {
  const { accountname } = useParams<{ accountname: string }>();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;
  const targetAccountname = accountname ?? myAccountname;
  const isMyProfile = !accountname || accountname === myAccountname;

  return {
    accountname,
    myAccountname,
    targetAccountname,
    isMyProfile,
  };
}
