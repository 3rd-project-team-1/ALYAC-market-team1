import { useQuery } from '@tanstack/react-query';

import { getPost } from '../api/getPost';
import { postQueryKeys } from '../api/queryKeys';

export function usePostQuery(postId: string | undefined) {
  return useQuery({
    queryKey: postQueryKeys.post(postId),
    queryFn: () => getPost(postId!).then((res) => res.post),
    enabled: !!postId,
  });
}
