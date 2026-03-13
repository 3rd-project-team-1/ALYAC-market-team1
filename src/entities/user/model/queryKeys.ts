export const userQueryKeys = {
  profile: (accountname?: string) => ['profile', accountname] as const,
  followers: (accountname?: string) => ['followers', accountname] as const,
  followings: (accountname?: string) => ['followings', accountname] as const,
  searchUsers: (keyword: string) => ['users', 'search', keyword] as const,
  currentUser: () => ['currentUser'] as const,
};
