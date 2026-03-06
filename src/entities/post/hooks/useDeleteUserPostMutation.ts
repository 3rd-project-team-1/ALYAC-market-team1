import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost } from '../api/deletePost';

export function useDeleteUserPostMutation(accountname?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', accountname] });
      toast.success('게시글이 삭제되었습니다');
    },
    onError: () => {
      toast.error('게시글 삭제에 실패했습니다');
    },
  });
}
