import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { postApi } from '@/entities/post/api';
import { ChatIcon, HeartIcon, UploadImageSmallIcon } from '@/shared/assets';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { TopBasicNav } from '@/widgets/top-basic-nav';

import { CommentFooter } from './comment/comment';

export function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;

  // 게시글 조회
  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postApi.getPost(postId!).then((res) => res.data.post),
    enabled: !!postId,
  });

  // 댓글 목록 조회
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => postApi.getComments(postId!).then((res) => res.data.comment),
    enabled: !!postId,
  });

  // 좋아요 토글
  const heartMutation = useMutation({
    mutationFn: () => postApi.toggleHeart(postId!),
    onSuccess: (res) => {
      queryClient.setQueryData(['post', postId], res.data.post);
    },
  });

  // 댓글 작성
  const createCommentMutation = useMutation({
    mutationFn: (text: string) => postApi.createComment(postId!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => postApi.deleteComment(postId!, commentId),
    onSuccess: () => {
      setShowCommentModal(false);
      setSelectedCommentId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  // 게시글 삭제
  const deletePostMutation = useMutation({
    mutationFn: () => postApi.deletePost(postId!),
    onSuccess: () => {
      setShowModal(false);
      navigate(-1);
    },
  });

  const isMyPost = post?.author.accountname === myAccountname;

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
            {/* todo: 여기에있는 이거를 헤더에 올려야함!  */}
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
        {post.image ? (
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
        ) : (
          <div className="mt-4 flex items-center justify-center rounded-xl bg-gray-100 p-8">
            <UploadImageSmallIcon />
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
            <HeartIcon />
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
      <div className="flex flex-col gap-4 px-4 py-4 pb-20">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <div className="bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
              {c.author.image ? (
                <img
                  src={getImageUrl(c.author.image) ?? c.author.image}
                  alt={c.author.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UploadImageSmallIcon />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">{c.author.username}</span>
                <span className="text-muted-foreground text-xs">
                  {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className="text-foreground text-sm">{c.content}</p>
            </div>
            {c.author.accountname === myAccountname && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCommentId(c.id);
                  setShowCommentModal(true);
                }}
                aria-label="더보기"
              >
                {/* todo: svg 파일로 바꾸고, 지금 기능이 삭제만 있는데 신고하기 추가 */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <CommentFooter onSubmit={(text) => createCommentMutation.mutate(text)} />

      {/* 게시글 옵션 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-background w-full max-w-md rounded-t-2xl pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
            </div>
            <button
              type="button"
              className="text-foreground hover:bg-accent w-full px-6 py-4 text-left text-sm"
              onClick={() => setShowModal(false)}
            >
              신고하기
            </button>
            {isMyPost && (
              <button
                type="button"
                className="text-destructive hover:bg-accent w-full px-6 py-4 text-left text-sm"
                onClick={() => deletePostMutation.mutate()}
                disabled={deletePostMutation.isPending}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      )}

      {/* 댓글 옵션 모달 */}
      {showCommentModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
          onClick={() => setShowCommentModal(false)}
        >
          <div
            className="bg-background w-full max-w-md rounded-t-2xl pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
            </div>
            <button
              type="button"
              className="text-destructive hover:bg-accent w-full px-6 py-4 text-left text-sm"
              onClick={() => selectedCommentId && deleteCommentMutation.mutate(selectedCommentId)}
              disabled={deleteCommentMutation.isPending}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
