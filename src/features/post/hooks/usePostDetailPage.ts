import { useNavigate, useParams } from 'react-router-dom';

import {
  useCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useHeartMutation,
  usePostQuery,
} from '@/entities/post';
import { getTokenUserInfo } from '@/shared/lib/utils/token';

export function usePostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;

  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);
  const { data: comments = [] } = useCommentsQuery(postId);
  const heartMutation = useHeartMutation(postId);
  const createCommentMutation = useCreateCommentMutation(postId);
  const deleteCommentMutation = useDeleteCommentMutation(postId);
  const deletePostMutation = useDeletePostMutation(postId, () => navigate(-1));

  const isMyPost = post?.author.accountname === myAccountname;

  return {
    post,
    comments,
    isPostLoading,
    myAccountname,
    isMyPost,
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  };
}
