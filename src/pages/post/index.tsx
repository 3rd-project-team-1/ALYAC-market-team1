import { useState } from 'react';

import { toast } from 'sonner';

import {
  CommentFooter,
  PostCommentsList,
  PostDetailCard,
  usePostDetailPage,
} from '@/features/post';
import { cn } from '@/shared/lib';
import { LoadingSpinner, LogoutModal } from '@/shared/ui';
import { MoreMenu, TopBasicNav } from '@/widgets/top-basic-nav';

export function PostPage() {
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

  const [postDialogType, setPostDialogType] = useState<'report' | 'delete' | null>(null);

  if (isPostLoading) {
    return <LoadingSpinner fullScreen message="게시글을 불러오는 중입니다..." />;
  }

  if (!post) {
    return (
      <div className={cn('bg-background flex h-screen items-center justify-center')}>
        <p className={cn('text-muted-foreground text-sm')}>게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopBasicNav
        moreMenu={
          <MoreMenu
            items={[
              { label: '신고하기', onClick: () => setPostDialogType('report') },
              ...(isMyPost
                ? [
                    {
                      label: <span className={cn('text-destructive')}>삭제</span>,
                      onClick: () => setPostDialogType('delete'),
                    },
                  ]
                : []),
            ]}
          />
        }
      />

      <PostDetailCard
        post={post}
        onToggleHeart={() => heartMutation.mutate()}
        isHeartPending={heartMutation.isPending}
      />

      <div className={cn('border-border mt-4 border-t')} />

      <PostCommentsList
        comments={comments}
        myAccountname={myAccountname}
        onDeleteComment={(commentId) => deleteCommentMutation.mutate(commentId)}
      />

      <CommentFooter onSubmit={(text) => createCommentMutation.mutate(text)} />

      {postDialogType === 'report' && (
        <LogoutModal
          title="신고하시겠습니까?"
          confirmText="신고"
          cancelText="취소"
          onConfirm={() => {
            toast.success('게시글이 신고되었습니다.');
            setPostDialogType(null);
          }}
          onCancel={() => setPostDialogType(null)}
        />
      )}

      {postDialogType === 'delete' && (
        <LogoutModal
          title="게시글을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            deletePostMutation.mutate();
            setPostDialogType(null);
          }}
          onCancel={() => setPostDialogType(null)}
        />
      )}
    </div>
  );
}
