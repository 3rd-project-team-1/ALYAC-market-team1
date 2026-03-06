import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useHeartMutation,
} from '@/entities/post';

export function usePostDetailMutations(postId: string | undefined) {
  const navigate = useNavigate();

  const heartMutation = useHeartMutation(postId);
  const createCommentMutation = useCreateCommentMutation(postId);
  const deleteCommentMutation = useDeleteCommentMutation(postId, () => {
    toast.success('삭제가 완료되었습니다.');
  });
  const deletePostMutation = useDeletePostMutation(postId, () => navigate(-1));

  return {
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  };
}
