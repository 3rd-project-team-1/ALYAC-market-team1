import {
  CommentActionSheet,
  CommentFooter,
  PostActionSheet,
  PostCommentsList,
  usePostDetailPage,
} from '@/features/post';
import { ChatIcon, HeartIcon, UploadImageSmallIcon } from '@/shared/assets';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
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

      {/* 게시글 본문 */}
      <div className="px-4 pt-5">
        {/* 작성자 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted h-10 w-10 overflow-hidden rounded-full">
              {post.author.image ? (
                <img
                  src={getImageUrl(post.author.image) ?? post.author.image}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UploadImageSmallIcon />
                </div>
              )}
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
              <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
            </div>
          </div>
          <button type="button" onClick={() => setShowModal(true)} aria-label="더보기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* 게시글 내용 */}
        <p className="text-foreground mt-4 text-sm leading-relaxed">{post.content}</p>

        {/* 게시글 이미지 */}
        {post.image && (
          <div className="mt-4 overflow-hidden rounded-xl">
            {(() => {
              const images = post.image.split(',').map((img) => img.trim());
              return images.length > 1 ? (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={getImageUrl(img) ?? img}
                      alt={`게시글 이미지 ${index + 1}`}
                      className="h-48 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={getImageUrl(images[0]) ?? images[0]}
                  alt="게시글 이미지"
                  className="w-full object-cover"
                />
              );
            })()}
          </div>
        )}

        {/* 좋아요 / 댓글 수 */}
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => heartMutation.mutate()}
            disabled={heartMutation.isPending}
            className="flex items-center gap-1.5"
          >
            <HeartIcon active={post.hearted} />
            <span className="text-muted-foreground text-xs">{post.heartCount}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5">
            <ChatIcon />
            <span className="text-muted-foreground text-xs">{post.commentCount}</span>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-border mt-4 border-t" />

      {/* 댓글 목록 */}
      <PostCommentsList
        comments={comments}
        myAccountname={myAccountname}
        onOpenCommentOption={(commentId) => {
          setSelectedCommentId(commentId);
          setShowCommentModal(true);
        }}
      />

      {/* 댓글 입력창 */}
      <CommentFooter onSubmit={(text) => createCommentMutation.mutate(text)} />

      {/* 게시글 옵션 모달 */}
      <PostActionSheet
        isOpen={showModal}
        isMyPost={isMyPost}
        isDeletePending={deletePostMutation.isPending}
        onClose={() => setShowModal(false)}
        onDeletePost={() => deletePostMutation.mutate()}
      />

      {/* 댓글 옵션 모달 */}
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
