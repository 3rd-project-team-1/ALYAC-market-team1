import { useMemo } from 'react';

export function usePostMoreMenu(
  isMyPost: boolean,
  openReportDialog: () => void,
  openDeleteDialog: () => void,
) {
  const moreMenuItems = useMemo(
    () => [
      { label: '신고하기', onClick: openReportDialog },
      ...(isMyPost
        ? [
            {
              label: '삭제',
              onClick: openDeleteDialog,
            },
          ]
        : []),
    ],
    [isMyPost, openReportDialog, openDeleteDialog],
  );

  return {
    moreMenuItems,
  };
}
