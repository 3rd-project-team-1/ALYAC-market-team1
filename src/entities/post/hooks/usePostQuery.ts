import { useQuery } from '@tanstack/react-query';

import { getPost } from '../api/getPost';

export function usePostQuery(postId: string | undefined) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId!).then((res) => res.data.post),
    enabled: !!postId,
  });
}
