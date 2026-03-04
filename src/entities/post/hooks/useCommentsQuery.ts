import { useQuery } from '@tanstack/react-query';

import { getComments } from '../api/getComments';

export function useCommentsQuery(postId: string | undefined) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId!).then((res) => res.data.comment),
    enabled: !!postId,
  });
}
