import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import { ROUTE_PATHS } from '@/shared/routes';

import { useProfileTargetAccount } from './useProfileTargetAccount';

export function useProfileTopSection() {
  const navigate = useNavigate();
  const { isMyProfile, targetAccountname } = useProfileTargetAccount();

  const { data: profile } = useProfile(targetAccountname);
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: profile?.isfollow,
  });

  const handleFollowersClick = () => {
    if (!profile) return;
    navigate(ROUTE_PATHS.FOLLOWERS(profile.accountname));
  };

  const handleFollowingsClick = () => {
    if (!profile) return;
    navigate(ROUTE_PATHS.FOLLOWINGS(profile.accountname));
  };

  const handleEditProfileClick = () => {
    navigate(ROUTE_PATHS.EDIT_PROFILE);
  };

  const handleCreateProductClick = () => {
    navigate(ROUTE_PATHS.CREATE_PRODUCT);
  };

  const handleChatClick = () => {
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleToggleFollow = () => {
    if (!profile) return;
    toggleFollow(profile.accountname);
  };

  return {
    profile,
    isMyProfile,
    isFollowing,
    isFollowPending: followMutation.isPending,
    handleFollowersClick,
    handleFollowingsClick,
    handleEditProfileClick,
    handleCreateProductClick,
    handleChatClick,
    handleToggleFollow,
  };
}
