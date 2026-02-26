import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { postApi } from '@/entities/post';
import type { Post } from '@/entities/post/types';

export function useUserPostsWithHeart(accountname?: string) {
  const queryClient = useQueryClient();
  const queryKey = ['userPosts', accountname] as const;

  const { data: posts = [] } = useQuery({
    queryKey,
    queryFn: () => postApi.getUserPosts(accountname!).then((res) => res.data.post),
    enabled: !!accountname,
  });

  const heartMutation = useMutation({
    mutationFn: (postId: string) => postApi.toggleHeart(postId),
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
