import { useState } from 'react';

import { toast } from 'sonner';

import { usePostDetailPage } from './usePostDetailPage';

type PostDialogType = 'report' | 'delete' | null;

export function usePostPage() {
  const {
    post,
    comments,
    isPostLoading,
    myAccountname,
    isMyPost,
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  } = usePostDetailPage();

  const [postDialogType, setPostDialogType] = useState<PostDialogType>(null);

  const handleOpenReportDialog = () => {
    setPostDialogType('report');
  };

  const handleOpenDeleteDialog = () => {
    setPostDialogType('delete');
  };

  const handleCloseDialog = () => {
    setPostDialogType(null);
  };

  const handleReportConfirm = () => {
    toast.success('게시글이 신고되었습니다.');
    handleCloseDialog();
  };

  const handleDeleteConfirm = () => {
    deletePostMutation.mutate();
    handleCloseDialog();
  };

  const moreMenuItems = [
    { label: '신고하기', onClick: handleOpenReportDialog },
    ...(isMyPost
      ? [
          {
            label: '삭제',
            onClick: handleOpenDeleteDialog,
          },
        ]
      : []),
  ];

  return {
    post,
    comments,
    isPostLoading,
    myAccountname,
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    moreMenuItems,
    postDialogType,
    handleReportConfirm,
    handleDeleteConfirm,
    handleCloseDialog,
  };
}
