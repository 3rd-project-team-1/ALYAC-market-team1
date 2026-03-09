export const postQueryKeys = {
  post: (postId: string | undefined) => ['post', postId] as const,
  comments: (postId: string | undefined) => ['comments', postId] as const,
  userPosts: (accountname?: string) => ['userPosts', accountname] as const,
  feed: () => ['feed'] as const,
};
