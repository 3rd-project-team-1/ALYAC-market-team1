import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { postApi } from '@/entities/post/api';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

export function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;
  const hasComment = comment.trim().length > 0;

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
    mutationFn: () => postApi.createComment(postId!, comment),
    onSuccess: () => {
      setComment('');
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
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="border-muted border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 게시글 본문 */}
      <div className="px-4 pt-5">
        {/* 작성자 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted h-10 w-10 overflow-hidden rounded-full">
              <img
                src={post.author.image || uploadImage}
                alt="프로필"
                className="h-full w-full object-cover"
              />
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
            <img src={post.image} alt="게시글 이미지" className="w-full object-cover" />
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={post.hearted ? '#11CC27' : 'none'}
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke={post.hearted ? '#11CC27' : 'currentColor'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-muted-foreground text-xs">{post.heartCount}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
              <img
                src={c.author.image || uploadImage}
                alt={c.author.username}
                className="h-full w-full object-cover"
              />
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
      <div className="border-border bg-background fixed right-0 bottom-0 left-0 flex items-center gap-3 border-t px-4 py-3">
        <div className="bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글 달아이지..."
          className="bg-background text-foreground placeholder:text-muted-foreground flex-1 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => createCommentMutation.mutate()}
          disabled={!hasComment || createCommentMutation.isPending}
          className={`text-sm font-medium transition-colors ${hasComment ? 'text-[#3C9E00]' : 'text-[#C4E4A5]'}`}
        >
          게시
        </button>
      </div>

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
