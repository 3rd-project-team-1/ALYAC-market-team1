import {
  CommentActionSheet,
  CommentFooter,
  PostActionSheet,
  PostCommentsList,
  PostDetailCard,
  usePostDetailPage,
} from '@/features/post';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { MoreMenu, TopBasicNav } from '@/widgets/top-basic-nav';

export function PostPage() {
  const {
    post,
    comments,
    isPostLoading,
    myAccountname,
    isMyPost,
    showModal,
    setShowModal,
    showCommentModal,
    setShowCommentModal,
    selectedCommentId,
    setSelectedCommentId,
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  } = usePostDetailPage();

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
        moreMenu={<MoreMenu onClick={() => setShowModal(true)} />}
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
        onOpenCommentOption={(commentId) => {
          setSelectedCommentId(commentId);
          setShowCommentModal(true);
        }}
      />

      <CommentFooter onSubmit={(text) => createCommentMutation.mutate(text)} />

      <PostActionSheet
        isOpen={showModal}
        isMyPost={isMyPost}
        isDeletePending={deletePostMutation.isPending}
        onClose={() => setShowModal(false)}
        onDeletePost={() => deletePostMutation.mutate()}
      />

      <CommentActionSheet
        isOpen={showCommentModal}
        isDeletePending={deleteCommentMutation.isPending}
        onClose={() => setShowCommentModal(false)}
        onDeleteComment={() => selectedCommentId && deleteCommentMutation.mutate(selectedCommentId)}
      />
    </div>
  );
}
