import { Helmet } from 'react-helmet-async';

import {
  PostPageContent,
  usePostDetailData,
  usePostDetailMutations,
  usePostDialog,
  usePostMoreMenu,
  usePostRouteInfo,
} from '@/features/post';
import { cn } from '@/shared/lib';
import { FRONTEND_URL, ROUTE_PATHS } from '@/shared/routes';
import { LoadingSpinner } from '@/shared/ui';

export function PostPage() {
  const { postId, myAccountname } = usePostRouteInfo();
  const { post, comments, isPostLoading, isCommentsLoading, commentsPagination } =
    usePostDetailData(postId);
  const { heartMutation, createCommentMutation, deleteCommentMutation, deletePostMutation } =
    usePostDetailMutations(postId);

  const isMyPost = post?.author.accountname === myAccountname;

  const {
    postDialogType,
    openReportDialog,
    openDeleteDialog,
    closeDialog,
    handleReportConfirm,
    handleDeleteConfirm,
  } = usePostDialog(() => {
    deletePostMutation.mutate();
  });

  const { moreMenuItems } = usePostMoreMenu(!!isMyPost, openReportDialog, openDeleteDialog);

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
  // SEO를 위한 데이터 가공
  const postPreview = post.content.slice(0, 100) || '게시글';

  const authorName = post.author.username;
  return (
    <>
      <Helmet>
        <title>{`${authorName}님의 게시글 | Alyac Market`}</title>
        <link rel="canonical" href={`${FRONTEND_URL}${ROUTE_PATHS.POST}/${postId}`} />

        {/* 소셜 공유용 OG 태그만 유지 */}
        <meta property="og:title" content={`${authorName}님의 게시글`} />
        <meta property="og:description" content={postPreview} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${FRONTEND_URL}${ROUTE_PATHS.POST}/${postId}`} />
        {post.image && <meta property="og:image" content={post.image.split(',')[0]} />}
      </Helmet>

      <PostPageContent
        post={post}
        comments={comments}
        isCommentsLoading={isCommentsLoading}
        commentsPagination={commentsPagination}
        myAccountname={myAccountname}
        isHeartPending={heartMutation.isPending}
        postDialogType={postDialogType}
        moreMenuItems={moreMenuItems}
        onToggleHeart={() => heartMutation.mutate(post.hearted)}
        onDeleteComment={(commentId) => deleteCommentMutation.mutate(commentId)}
        onCreateComment={(text) => createCommentMutation.mutate(text)}
        onReportConfirm={handleReportConfirm}
        onDeleteConfirm={handleDeleteConfirm}
        onCloseDialog={closeDialog}
      />
    </>
  );
}
