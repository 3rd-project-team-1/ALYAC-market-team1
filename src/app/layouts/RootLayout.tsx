import { Outlet, useLocation } from 'react-router-dom';

import { TabMenu } from '@/widgets/tab-menu';

const HIDE_TAB_MENU_PATHS = [
  '/edit-profile',
  '/post-create',
  '/create-product',
  '/edit-product',
  '/signin',
  '/signup',
  '/post',
  '/chat/1',
  '/chat/2',
  '/chat/3',
  '/signup/profile',
  '/',
];

export function RootLayout() {
  const location = useLocation();
  const showTabMenu = !HIDE_TAB_MENU_PATHS.some((path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
  );

  return (
    <div>
      <main className="mx-auto max-w-5xl">
        <Outlet />
      </main>
      {showTabMenu && <TabMenu />}
    </div>
  );
}
