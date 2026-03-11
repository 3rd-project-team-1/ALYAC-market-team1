import { useNavigate, useParams } from 'react-router-dom';

import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function useFollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followings, isLoading } = useFollowingList(accountname);
  // 서버의 isfollow 버그 우회: 내 팔로잉 목록을 별도로 조회해 isfollow를 교정합니다.
  const { followings: myFollowings } = useFollowingList(myAccountname ?? undefined);
  const myFollowingSet = new Set(myFollowings.map((u) => u.accountname));

  const correctedFollowings = followings.map((following) => ({
    ...following,
    isfollow: myFollowingSet.has(following.accountname),
  }));

  return {
    followings: correctedFollowings,
    isLoading,
    myAccountname,
    onBack: () => navigate(-1),
  };
}
