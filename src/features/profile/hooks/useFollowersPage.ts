import { useNavigate, useParams } from 'react-router-dom';

import { useFollowerList } from '@/entities/user/hooks/useFollowerList';
import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function useFollowersPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followers, isLoading } = useFollowerList(accountname);

  return {
    followers,
    isLoading,
    myAccountname,
    onBack: () => navigate(-1),
  };
}
