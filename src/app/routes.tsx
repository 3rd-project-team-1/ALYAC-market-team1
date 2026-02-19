import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { SignInPage } from '@/pages/signin';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
]);
