import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { postApi } from '@/entities/post/api';
import type { Comment, Post } from '@/entities/post/types';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

export function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;
  const hasComment = comment.trim().length > 0;

  useEffect(() => {
    if (!postId) return;
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          postApi.getPost(postId),
          postApi.getComments(postId),
        ]);
        setPost(postRes.data.post);
        setComments(commentsRes.data.comment);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleToggleHeart = async () => {
    if (!postId || !post) return;
    try {
      const res = await postApi.toggleHeart(postId);
      setPost(res.data.post);
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!hasComment || !postId) return;
    try {
      const res = await postApi.createComment(postId, comment);
      setComments((prev) => [...prev, res.data.comment]);
      setPost((prev) => (prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev));
      setComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleDeleteComment = async () => {
    if (!postId || !selectedCommentId) return;
    try {
      await postApi.deleteComment(postId, selectedCommentId);
      setComments((prev) => prev.filter((c) => c.id !== selectedCommentId));
      setPost((prev) => (prev ? { ...prev, commentCount: prev.commentCount - 1 } : prev));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    } finally {
      setShowCommentModal(false);
      setSelectedCommentId(null);
    }
  };

  const handleDeletePost = async () => {
    if (!postId) return;
    try {
      await postApi.deletePost(postId);
      navigate(-1);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    } finally {
      setShowModal(false);
    }
  };

  const isMyPost = post?.author.accountname === myAccountname;

  if (isLoading) {
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* 게시글 본문 */}
      <div className="px-4 pt-5">
        {/* 작성자 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
              <img
                src={post.author.image || uploadImage}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author.username}</p>
              <p className="text-xs text-muted-foreground">@{post.author.accountname}</p>
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
        <p className="mt-4 text-sm leading-relaxed text-foreground">{post.content}</p>

        {/* 게시글 이미지 */}
        {post.image && (
          <div className="mt-4 overflow-hidden rounded-xl">
            <img src={post.image} alt="게시글 이미지" className="w-full object-cover" />
          </div>
        )}

        {/* 좋아요 / 댓글 수 */}
        <div className="mt-3 flex items-center gap-4">
          <button type="button" onClick={handleToggleHeart} className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={post.hearted ? '#11CC27' : 'none'}>
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke={post.hearted ? '#11CC27' : 'currentColor'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs text-muted-foreground">{post.heartCount}</span>
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
            <span className="text-xs text-muted-foreground">{post.commentCount}</span>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mt-4 border-t border-border" />

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-4 px-4 py-4 pb-20">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
              <img
                src={c.author.image || uploadImage}
                alt={c.author.username}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{c.author.username}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className="text-sm text-foreground">{c.content}</p>
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
      <div className="fixed bottom-0 left-0 right-0 flex items-center gap-3 border-t border-border bg-background px-4 py-3">
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글 달아이지..."
          className="flex-1 bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={handleCommentSubmit}
          disabled={!hasComment}
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
            className="w-full max-w-md rounded-t-2xl bg-background pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => setShowModal(false)}
            >
              신고하기
            </button>
            {isMyPost && (
              <button
                type="button"
                className="w-full px-6 py-4 text-left text-sm text-destructive hover:bg-accent"
                onClick={handleDeletePost}
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
            className="w-full max-w-md rounded-t-2xl bg-background pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-destructive hover:bg-accent"
              onClick={handleDeleteComment}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
