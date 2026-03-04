import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getUserPosts } from '../api/getUserPosts';
import { toggleHeart } from '../api/toggleHeart';
import type { Post } from '../types';

export function useUserPostsWithHeart(accountname?: string) {
  const queryClient = useQueryClient();
  const queryKey = ['userPosts', accountname] as const;

  const { data: posts = [] } = useQuery({
    queryKey,
    queryFn: () => getUserPosts(accountname!).then((res) => res.data.post),
    enabled: !!accountname,
  });

  const heartMutation = useMutation({
    mutationFn: (postId: string) => toggleHeart(postId),
    onMutate: (postId) => {
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
