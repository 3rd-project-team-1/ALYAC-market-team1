import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getUserPosts } from '../api/getUserPosts';
import { toggleHeart } from '../api/toggleHeart';
import type { Post } from '../model/post.schema';
import { postQueryKeys } from '../model/queryKeys';

export function useUserPostsWithHeart(accountname?: string) {
  const queryClient = useQueryClient();
  const queryKey = postQueryKeys.userPosts(accountname);

  const { data: posts = [] } = useQuery({
    queryKey,
    queryFn: () => getUserPosts(accountname!).then((res) => res.post),
    enabled: !!accountname,
  });

  const heartMutation = useMutation({
    mutationFn: ({ postId, isHearted }: { postId: string; isHearted: boolean }) =>
      toggleHeart(postId, isHearted),
    onMutate: ({ postId }) => {
      queryClient.setQueryData<Post[]>(queryKey, (old = []) =>
        old.map((post) =>
          post.id === postId
            ? {
                ...post,
                hearted: !post.hearted,
                heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
              }
            : post,
        ),
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { posts, heartMutation };
}
