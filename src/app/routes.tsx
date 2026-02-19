import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { ProfilePage } from '@/pages/profile';
import { SettingsPage } from '@/pages/settings';

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
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
