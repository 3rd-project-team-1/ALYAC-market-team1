import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { FeedPage } from '@/pages/feed';
import { HomePage } from '@/pages/home';
import { SignInPage } from '@/pages/signin';
import { NotFoundPage } from '@/pages/not-found';
import { SearchPage } from '@/pages/search';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';

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
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'feed', element: <FeedPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: '*', id: 'not-found', element: <NotFoundPage /> },
    ],
  },
]);