import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useUserPostsWithHeart } from '@/entities/post/hooks/useUserPostsWithHeart';
import { useUserProducts } from '@/entities/product/hooks/useUserProducts';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import { useProfile } from '@/entities/user/hooks/useProfile';

export type ViewMode = 'grid' | 'list';

export function useProfilePage() {
  const { accountname } = useParams<{ accountname: string }>();
  const { profile, isLoading, isError, isMyProfile } = useProfile(accountname);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: profile?.isfollow,
  });

  const { products } = useUserProducts(profile?.accountname);
  const { posts, heartMutation } = useUserPostsWithHeart(profile?.accountname);

  return {
    profile,
    isLoading,
    isError,
    isMyProfile,
    viewMode,
    setViewMode,
    isFollowing,
    followMutation,
    toggleFollow,
    products,
    posts,
    heartMutation,
  };
}
