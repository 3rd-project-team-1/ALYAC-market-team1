import { useQuery } from '@tanstack/react-query';

import { getComments } from '../api/getComments';
import { postQueryKeys } from '../api/queryKeys';

export function useCommentsQuery(postId: string | undefined) {
  return useQuery({
    queryKey: postQueryKeys.comments(postId),
    queryFn: () => getComments(postId!).then((res) => res.comment),
    enabled: !!postId,
  });
}
