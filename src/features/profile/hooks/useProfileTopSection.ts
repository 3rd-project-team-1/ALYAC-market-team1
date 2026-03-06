import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';

import { useProfileTargetAccount } from './useProfileTargetAccount';

export function useProfileTopSection() {
  const navigate = useNavigate();
  const { isMyProfile, targetAccountname } = useProfileTargetAccount();

  const { profile } = useProfile(targetAccountname);
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: profile?.isfollow,
  });

  const handleFollowersClick = () => {
    if (!profile) return;
    navigate(`/followers/${profile.accountname}`);
  };

  const handleFollowingsClick = () => {
    if (!profile) return;
    navigate(`/followings/${profile.accountname}`);
  };

  const handleEditProfileClick = () => {
    navigate('/edit-profile');
  };

  const handleCreateProductClick = () => {
    navigate('/create-product');
  };

  const handleChatClick = () => {
    navigate('/chat');
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
