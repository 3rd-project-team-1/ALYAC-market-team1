import { Outlet, useLocation } from 'react-router-dom';

import { TabMenu } from '@/widgets/tab-menu/ui/Tab-menu';

//TODO: 세윤님 페이지 이름 변경 후 연결 예정
const HIDE_TAB_MENU_PATHS = ['/edit-profile', '/post-create', '/signin', '/signup', '/'];

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
