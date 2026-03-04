import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { RequireAuth, RequireGuest } from '@/features/auth';

const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const SignInPage = lazy(() => import('@/pages/signin').then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/signup').then((m) => ({ default: m.SignUpPage })));
const FeedPage = lazy(() => import('@/pages/feed').then((m) => ({ default: m.FeedPage })));
const SearchPage = lazy(() => import('@/pages/search').then((m) => ({ default: m.SearchPage })));
const ProfilePage = lazy(() => import('@/pages/profile').then((m) => ({ default: m.ProfilePage })));
const SignUpProfilePage = lazy(() =>
  import('@/pages/signup-profile').then((m) => ({ default: m.SignUpProfilePage })),
);

const EditProfilePage = lazy(() =>
  import('@/pages/edit-profile').then((m) => ({ default: m.EditProfilePage })),
);
const CreateProductPage = lazy(() =>
  import('@/pages/create-product').then((m) => ({ default: m.CreateProductPage })),
);
const EditProductPage = lazy(() =>
  import('@/pages/edit-product').then((m) => ({ default: m.EditProductPage })),
);
const PostCreatePage = lazy(() =>
  import('@/pages/create-post').then((m) => ({ default: m.PostCreatePage })),
);
const EditPostPage = lazy(() =>
  import('@/pages/edit-post').then((m) => ({ default: m.EditPostPage })),
);
const PostPage = lazy(() => import('@/pages/post').then((m) => ({ default: m.PostPage })));
const ChatPage = lazy(() => import('@/pages/chat').then((m) => ({ default: m.ChatPage })));
const ChatRoomPage = lazy(() =>
  import('@/pages/chat-room').then((m) => ({ default: m.ChatRoomPage })),
);
const FollowersPage = lazy(() =>
  import('@/pages/followers').then((m) => ({ default: m.FollowersPage })),
);
const FollowingsPage = lazy(() =>
  import('@/pages/followings').then((m) => ({ default: m.FollowingsPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      //  로그인한 유저만 접근 가능한 페이지들
      {
        element: <RequireAuth />, // 토큰 없으면 /signin 으로 쫓아냄
        children: [
          {
            path: 'feed',
            element: <FeedPage />,
          },
          {
            path: 'search',
            element: <SearchPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'profile/:accountname',
            element: <ProfilePage />,
          },
          {
            path: 'edit-profile',
            element: <EditProfilePage />,
          },
          {
            path: 'create-product',
            element: <CreateProductPage />,
          },
          {
            path: 'edit-product/:productId',
            element: <EditProductPage />,
          },

          {
            path: 'create-post',
            element: <PostCreatePage />,
          },
          {
            path: 'post/:postId',
            element: <PostPage />,
          },
          {
            path: 'post/:postId/edit',
            element: <EditPostPage />,
          },
          {
            path: 'chat',
            element: <ChatPage />,
          },
          {
            path: 'chat/:roomId',
            element: <ChatRoomPage />,
          },
          {
            path: 'followers/:accountname',
            element: <FollowersPage />,
          },
          {
            path: 'followings/:accountname',
            element: <FollowingsPage />,
          },
        ],
      },

      //  비로그인 유저(Guest)만 접근 가능한 페이지들
      {
        element: <RequireGuest />, // 토큰 있으면 홈(/)으로 돌려보냄
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'signin',
            element: <SignInPage />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            path: 'signup/profile',
            element: <SignUpProfilePage />,
          },
        ],
      },
    ],
  },
  // 404 페이지는 레이아웃 없이 렌더링
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
