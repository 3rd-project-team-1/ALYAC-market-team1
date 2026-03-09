import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteUserPostMutation, useUserPostsWithHeart } from '@/entities/post';
import type { Post } from '@/entities/post/model/post.schema';
import { ROUTE_PATHS } from '@/shared/router';

import { useProfileTargetAccount } from './useProfileTargetAccount';

type ViewMode = 'grid' | 'list';

export function useProfilePostsSection() {
  const navigate = useNavigate();
  const { myAccountname, targetAccountname } = useProfileTargetAccount();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  const { posts, heartMutation } = useUserPostsWithHeart(targetAccountname);
  const deletePostMutation = useDeleteUserPostMutation(targetAccountname, {
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다');
    },
    onError: () => {
      toast.error('게시글 삭제에 실패했습니다');
    },
  });

  const handleEditPost = (post: Post) => {
    navigate(ROUTE_PATHS.EDIT_POST(post.id), { state: { post } });
  };

  const handlePostDetail = (postId: string) => {
    navigate(ROUTE_PATHS.POST(postId));
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
