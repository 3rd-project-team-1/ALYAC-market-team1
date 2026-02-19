import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/search';
import { FeedPage } from '@/pages/feed';
import { MyProfilePage } from '@/pages/myprofile';
import { YourProfilePage } from '@/pages/yourprofile';
import { SettingsPage } from '@/pages/settings';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';
import { CreatePostPage } from '@/pages/create-post';
import { NotFoundPage } from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'myprofile',
        element: <MyProfilePage />,
      },
      {
        path: 'yourprofile/:accountname',
        element: <YourProfilePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
