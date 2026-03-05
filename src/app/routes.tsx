import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { RequireAuth, RequireGuest } from '@/features/auth';

const lazyPage = (path: string, name: string) =>
  lazy(() => import(`@/pages/${path}`).then((m) => ({ default: m[name] })));

const HomePage = lazyPage('home', 'HomePage');
const SignInPage = lazyPage('signin', 'SignInPage');
const SignUpPage = lazyPage('signup', 'SignUpPage');
const FeedPage = lazyPage('feed', 'FeedPage');
const SearchPage = lazyPage('search', 'SearchPage');
const ProfilePage = lazyPage('profile', 'ProfilePage');
const SignUpProfilePage = lazyPage('signup-profile', 'SignUpProfilePage');
const EditProfilePage = lazyPage('edit-profile', 'EditProfilePage');
const CreateProductPage = lazyPage('create-product', 'CreateProductPage');
const EditProductPage = lazyPage('edit-product', 'EditProductPage');
const PostCreatePage = lazyPage('create-post', 'PostCreatePage');
const EditPostPage = lazyPage('edit-post', 'EditPostPage');
const PostPage = lazyPage('post', 'PostPage');
const ChatPage = lazyPage('chat', 'ChatPage');
const ChatRoomPage = lazyPage('chat-room', 'ChatRoomPage');
const FollowersPage = lazyPage('followers', 'FollowersPage');
const FollowingsPage = lazyPage('followings', 'FollowingsPage');
const NotFoundPage = lazyPage('not-found', 'NotFoundPage');

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
