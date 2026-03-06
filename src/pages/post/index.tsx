import { PostPageContent, usePostPage } from '@/features/post';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

export function PostPage() {
  const {
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
  } = usePostPage();

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
    <PostPageContent
      post={post}
      comments={comments}
      myAccountname={myAccountname}
      isHeartPending={heartMutation.isPending}
      postDialogType={postDialogType}
      moreMenuItems={moreMenuItems}
      onToggleHeart={() => heartMutation.mutate()}
      onDeleteComment={(commentId) => deleteCommentMutation.mutate(commentId)}
      onCreateComment={(text) => createCommentMutation.mutate(text)}
      onReportConfirm={handleReportConfirm}
      onDeleteConfirm={handleDeleteConfirm}
      onCloseDialog={handleCloseDialog}
    />
  );
}
