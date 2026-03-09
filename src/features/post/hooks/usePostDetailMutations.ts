import { useNavigate } from 'react-router-dom';

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useHeartMutation,
} from '@/entities/post';

export function usePostDetailMutations(postId: string | undefined) {
  const navigate = useNavigate();

  const heartMutation = useHeartMutation(postId!);
  const createCommentMutation = useCreateCommentMutation(postId!);
  const deleteCommentMutation = useDeleteCommentMutation(postId!);
  const deletePostMutation = useDeletePostMutation(postId!, { onSuccess: () => navigate(-1) });

  return {
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  };
}
