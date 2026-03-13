import { useState } from 'react';

import { toast } from 'sonner';

import { UploadImageSmallIcon } from '@/shared/assets';
import { useInfiniteScroll } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import { getRelativeTime } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { LoadingSpinner, LogoutModal } from '@/shared/ui';
import { MoreMenu } from '@/widgets/top-basic-nav';

interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    image: string;
    username: string;
    accountname: string;
  };
}

interface PostCommentsListProps {
  comments: PostComment[];
  isLoading: boolean;
  commentsPagination: {
    isFetchingMore: boolean;
    loadMore: () => void;
    hasMore: boolean;
  };
  myAccountname: string | null;
  onDeleteComment: (commentId: string) => void;
}

export function PostCommentsList({
  comments,
  isLoading,
  commentsPagination,
  myAccountname,
  onDeleteComment,
}: PostCommentsListProps) {
  const { ref } = useInfiniteScroll({
    hasMore: commentsPagination.hasMore,
    isFetching: commentsPagination.isFetchingMore,
    onLoadMore: commentsPagination.loadMore,
  });
  const [dialogType, setDialogType] = useState<'report' | 'delete' | null>(null);
  const [pendingCommentId, setPendingCommentId] = useState<string | null>(null);

  const openDialog = (type: 'report' | 'delete', commentId: string) => {
    setPendingCommentId(commentId);
    setDialogType(type);
  };

  const closeDialog = () => {
    setDialogType(null);
    setPendingCommentId(null);
  };

  const handleReportConfirm = () => {
    toast.success('댓글이 신고되었습니다.');
    closeDialog();
  };

  const handleDeleteConfirm = () => {
    if (pendingCommentId) {
      onDeleteComment(pendingCommentId);
    }
    closeDialog();
  };

  if (isLoading) {
    return (
      <div className={cn('flex flex-col px-4 py-8 pb-20')}>
        <LoadingSpinner message="댓글을 불러오는 중..." />
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className={cn('flex items-center justify-center pt-8 pb-20')}>
        <p className={cn('text-muted-foreground text-sm')}>아직 댓글이 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <div className={cn('flex flex-col gap-4 px-4 py-4 pb-20')}>
        {comments.map((comment) => (
          <div key={comment.id} className={cn('flex items-start gap-3')}>
            <div className={cn('bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full')}>
              {comment.author.image ? (
                <img
                  src={getImageUrl(comment.author.image) ?? comment.author.image}
                  alt={comment.author.username}
                  className={cn('h-full w-full object-cover')}
                />
              ) : (
                <div className={cn('flex h-full w-full items-center justify-center')}>
                  <UploadImageSmallIcon />
                </div>
              )}
            </div>
            <div className={cn('flex flex-1 flex-col gap-0.5')}>
              <div className={cn('flex items-center gap-2')}>
                <span className={cn('text-foreground text-sm font-semibold')}>
                  {comment.author.username}
                </span>
                <span className={cn('text-muted-foreground text-xs')}>
                  {getRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className={cn('text-foreground text-sm')}>{comment.content}</p>
            </div>
            <MoreMenu
              small
              items={[
                {
                  label: '신고하기',
                  onClick: () => openDialog('report', comment.id),
                },
                ...(comment.author.accountname === myAccountname
                  ? [
                      {
                        label: <span className={cn('text-destructive')}>삭제</span>,
                        onClick: () => openDialog('delete', comment.id),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        ))}
        <div ref={ref} className={cn('h-1')} />
        {commentsPagination.isFetchingMore && (
          <div className={cn('py-4')}>
            <LoadingSpinner message="댓글을 불러오는 중..." />
          </div>
        )}
      </div>

      {dialogType === 'report' && (
        <LogoutModal
          title="신고하시겠습니까?"
          confirmText="신고"
          cancelText="취소"
          onConfirm={handleReportConfirm}
          onCancel={closeDialog}
        />
      )}

      {dialogType === 'delete' && (
        <LogoutModal
          title="댓글을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDeleteConfirm}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}
