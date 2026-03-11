export const API_ENDPOINT = {
  // 인증
  AUTH_SIGNIN: '/api/user/signin',
  AUTH_SIGNUP: '/api/user',
  AUTH_REFRESH: '/api/user/refresh',
  AUTH_EMAIL_VALID: '/api/user/emailvalid',
  AUTH_ACCOUNTNAME_VALID: '/api/user/accountnamevalid',

  // 유저
  USER_ME: '/api/user/me',
  USER_UPDATE: '/api/user',
  USER_CHECKTOKEN: '/api/user/checktoken',
  USER_SEARCH: '/api/user/searchuser',

  // 프로필
  PROFILE: (accountname: string) => `/api/profile/${accountname}`,
  PROFILE_FOLLOW: (accountname: string) => `/api/profile/${accountname}/follow`,
  PROFILE_UNFOLLOW: (accountname: string) => `/api/profile/${accountname}/unfollow`,
  PROFILE_FOLLOWERS: (accountname: string) => `/api/profile/${accountname}/follower/`,
  PROFILE_FOLLOWINGS: (accountname: string) => `/api/profile/${accountname}/following/`,

  // 게시글
  POST_CREATE: '/api/post',
  POST_FEED: (skip: number, limit: number) => `/api/post/feed?skip=${skip}&limit=${limit}`,
  POST_GET: (postId: string) => `/api/post/${postId}`,
  POST_UPDATE: (postId: string) => `/api/post/${postId}`,
  POST_DELETE: (postId: string) => `/api/post/${postId}`,
  POST_HEART: (postId: string) => `/api/post/${postId}/heart`,
  POST_UNHEART: (postId: string) => `/api/post/${postId}/unheart`,
  POST_USER: (accountname: string, skip = 0, limit = 10) =>
    `/api/post/${accountname}/userpost?skip=${skip}&limit=${limit}`,
  POST_COMMENTS: (postId: string, skip = 0, limit = 10) =>
    `/api/post/${postId}/comments?skip=${skip}&limit=${limit}`,
  POST_COMMENT_DELETE: (postId: string, commentId: string) =>
    `/api/post/${postId}/comments/${commentId}`,

  // 상품
  PRODUCT_CREATE: '/api/product',
  PRODUCT_GET_USER: (accountname: string) => `/api/product/${accountname}`,
  PRODUCT_DETAIL: (id: string) => `/api/product/detail/${id}`,
  PRODUCT_UPDATE: (id: string) => `/api/product/${id}`,
  PRODUCT_DELETE: (id: string) => `/api/product/${id}`,

  // 이미지
  IMAGE_UPLOAD: '/api/image/uploadfile',
  IMAGE_UPLOAD_MULTIPLE: '/api/image/uploadfiles',
};
