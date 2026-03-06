import { useState } from 'react';

import { toast } from 'sonner';

type PostDialogType = 'report' | 'delete' | null;

export function usePostDialog(onDeleteConfirm: () => void) {
  const [postDialogType, setPostDialogType] = useState<PostDialogType>(null);

  const openReportDialog = () => {
    setPostDialogType('report');
  };

  const openDeleteDialog = () => {
    setPostDialogType('delete');
  };

  const closeDialog = () => {
    setPostDialogType(null);
  };

  const handleReportConfirm = () => {
    toast.success('게시글이 신고되었습니다.');
    closeDialog();
  };

  const handleDeleteConfirm = () => {
    onDeleteConfirm();
    closeDialog();
  };

  return {
    postDialogType,
    openReportDialog,
    openDeleteDialog,
    closeDialog,
    handleReportConfirm,
    handleDeleteConfirm,
  };
}
