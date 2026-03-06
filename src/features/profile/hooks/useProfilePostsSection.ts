import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDeleteUserPostMutation, useUserPostsWithHeart } from '@/entities/post';
import type { Post } from '@/entities/post';

import { useProfileTargetAccount } from './useProfileTargetAccount';

type ViewMode = 'grid' | 'list';

export function useProfilePostsSection() {
  const navigate = useNavigate();
  const { myAccountname, targetAccountname } = useProfileTargetAccount();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  const { posts, heartMutation } = useUserPostsWithHeart(targetAccountname);
  const deletePostMutation = useDeleteUserPostMutation(targetAccountname);

  const handleEditPost = (post: Post) => {
    navigate(`/post/${post.id}/edit`, { state: { post } });
  };

  const handlePostDetail = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetPostId && !deletePostMutation.isPending) {
      deletePostMutation.mutate(deleteTargetPostId);
    }
    setDeleteTargetPostId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetPostId(null);
  };

  return {
    posts,
    myAccountname,
    viewMode,
    setViewMode,
    deleteTargetPostId,
    setDeleteTargetPostId,
    isDeletingPost: deletePostMutation.isPending,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditPost,
    handlePostDetail,
    heartMutation,
  };
}
