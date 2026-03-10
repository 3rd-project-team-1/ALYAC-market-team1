export const ROUTE_PATHS = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  SIGNUP_PROFILE: '/signup/profile',

  FEED: '/feed',
  SEARCH: '/search',
  PROFILE: '/profile',
  PROFILE_DETAIL: (accountname: string) => `/profile/${accountname}`,
  EDIT_PROFILE: '/edit-profile',

  CREATE_PRODUCT: '/create-product',
  EDIT_PRODUCT: (productId: string) => `/edit-product/${productId}`,

  CREATE_POST: '/create-post',
  POST: (postId: string) => `/post/${postId}`,
  EDIT_POST: (postId: string) => `/post/${postId}/edit`,

  CHAT: '/chat',
  CHAT_ROOM: (roomId: string) => `/chat/${roomId}`,

  FOLLOWERS: (accountname: string) => `/followers/${accountname}`,
  FOLLOWINGS: (accountname: string) => `/followings/${accountname}`,
} as const;
