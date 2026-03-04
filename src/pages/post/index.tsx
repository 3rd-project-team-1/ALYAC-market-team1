import {
  CommentActionSheet,
  CommentFooter,
  PostActionSheet,
  PostCommentsList,
  PostDetailCard,
  usePostDetailPage,
} from '@/features/post';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { TopBasicNav } from '@/widgets/top-basic-nav';

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
      <div className="bg-background flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopBasicNav />

      <PostDetailCard
        post={post}
        onMoreClick={() => setShowModal(true)}
        onToggleHeart={() => heartMutation.mutate()}
        isHeartPending={heartMutation.isPending}
      />

      <div className="border-border mt-4 border-t" />

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
        onDeleteComment={() =>
          selectedCommentId && deleteCommentMutation.mutate(selectedCommentId)
        }
      />
    </div>
  );
}
