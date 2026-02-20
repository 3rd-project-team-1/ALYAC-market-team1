import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { RequireAuth } from '@/features/auth/ui/RequireAuth';
import { RequireGuest } from '@/features/auth/ui/RequireGuest';
import { CreatePostPage } from '@/pages/create-post';
import { EditProfilePage } from '@/pages/edit-profile';
import { FeedPage } from '@/pages/feed';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { ProfilePage } from '@/pages/profile';
import { SearchPage } from '@/pages/search';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';

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
            index: true,
            element: <HomePage />,
          },
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
            path: 'create-post',
            element: <CreatePostPage />,
          },
        ],
      },

      //  비로그인 유저(Guest)만 접근 가능한 페이지들
      {
        element: <RequireGuest />, // 토큰 있으면 홈(/)으로 돌려보냄
        children: [
          {
            path: 'signin',
            element: <SignInPage />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
        ],
      },

      // 404 페이지는누구나 볼 수 있게
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
