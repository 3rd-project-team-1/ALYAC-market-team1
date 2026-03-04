import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib/utils/token';
import {
  useCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useHeartMutation,
  usePostQuery,
} from '@/entities/post';

export function usePostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;

  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);
  const { data: comments = [] } = useCommentsQuery(postId);
  const heartMutation = useHeartMutation(postId);
  const createCommentMutation = useCreateCommentMutation(postId);
  const deleteCommentMutation = useDeleteCommentMutation(postId, () => {
    setShowCommentModal(false);
    setSelectedCommentId(null);
  });
  const deletePostMutation = useDeletePostMutation(postId, () => {
    setShowModal(false);
    navigate(-1);
  });

  const isMyPost = post?.author.accountname === myAccountname;

  return {
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
  };
}
