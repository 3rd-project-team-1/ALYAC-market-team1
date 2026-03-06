import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost } from '../api/deletePost';

export function useDeletePostMutation(postId: string | undefined, onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => deletePost(postId!),
    onSuccess: () => {
      toast.success('삭제가 완료되었습니다.');
      onSuccess?.();
    },
  });
}
