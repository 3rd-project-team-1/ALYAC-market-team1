import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const heartMutation = useHeartMutation(postId!);
  const createCommentMutation = useCreateCommentMutation(postId!, () => {
    toast.success('댓글이 작성되었습니다.');
  });
  const deleteCommentMutation = useDeleteCommentMutation(postId!, () => {
    toast.success('댓글이 삭제되었습니다.');
  });
  const deletePostMutation = useDeletePostMutation(postId!, {
    onSuccess: () => {
      toast.success('게시물이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      navigate(-1);
    },
  });

  return {
    heartMutation,
    createCommentMutation,
    deleteCommentMutation,
    deletePostMutation,
  };
}
