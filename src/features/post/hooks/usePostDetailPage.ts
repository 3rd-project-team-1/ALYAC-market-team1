import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { postApi } from '@/entities/post';

export function usePostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postApi.getPost(postId!).then((res) => res.data.post),
    enabled: !!postId,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => postApi.getComments(postId!).then((res) => res.data.comment),
    enabled: !!postId,
  });

  const heartMutation = useMutation({
    mutationFn: () => postApi.toggleHeart(postId!),
    onSuccess: (res) => {
      queryClient.setQueryData(['post', postId], res.data.post);
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: (text: string) => postApi.createComment(postId!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => postApi.deleteComment(postId!, commentId),
    onSuccess: () => {
      setShowCommentModal(false);
      setSelectedCommentId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: () => postApi.deletePost(postId!),
    onSuccess: () => {
      setShowModal(false);
      navigate(-1);
    },
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
