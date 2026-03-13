import { useNavigate, useParams } from 'react-router-dom';

import { useFollowerList } from '@/entities/user/hooks/useFollowerList';
import { useFollowingList } from '@/entities/user/hooks/useFollowingList';
import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function useFollowersPage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

  const { followers, isLoading } = useFollowerList(accountname);
  const { followings } = useFollowingList(myAccountname ?? undefined);
  const followingSet = new Set(followings.map((u) => u.accountname));

  const correctedFollowers = followers.map((follower) => ({
    ...follower,
    isfollow: followingSet.has(follower.accountname),
  }));

  return {
    followers: correctedFollowers,
    isLoading,
    myAccountname,
    onBack: () => navigate(-1),
  };
}
