import { useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function usePostRouteInfo() {
  const { postId } = useParams<{ postId: string }>();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;

  return {
    postId,
    myAccountname,
  };
}
