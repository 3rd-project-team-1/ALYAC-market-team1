import { useNavigate, useParams } from 'react-router-dom';

import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function useFollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followings, isLoading } = useFollowingList(accountname);

  return {
    followings,
    isLoading,
    myAccountname,
    onBack: () => navigate(-1),
  };
}
