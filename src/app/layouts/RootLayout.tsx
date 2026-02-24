import { Outlet, useLocation } from 'react-router-dom';

import { TabMenu } from '@/widgets/tab-menu/ui/Tab-menu';

const HIDE_TAB_MENU_PATHS = [
  '/edit-profile',
  '/post-create',
  '/create-product',
  '/signin',
  '/signup',
  '/post',
  '/chat-room',
  '/',
];

export function RootLayout() {
  const location = useLocation();
  const showTabMenu = !HIDE_TAB_MENU_PATHS.includes(location.pathname);

  return (
    <div>
      <main className="mx-auto max-w-5xl">
        <Outlet />
      </main>
      {showTabMenu && <TabMenu />}
    </div>
  );
}
