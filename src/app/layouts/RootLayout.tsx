import { Outlet, useLocation } from 'react-router-dom';
import { TabMenu } from '@/widgets/tab-menu/ui/tab-menu'; // TabMenu 경로에 맞게 수정

const HIDE_TAB_MENU_PATHS = ['/edit-profile', '/create-post', '/signin', '/signup', '/'];

export function RootLayout() {
  const location = useLocation();
  const showTabMenu = !HIDE_TAB_MENU_PATHS.includes(location.pathname);

  return (
    <div>
      <main className='mx-auto max-w-5xl'>
        <Outlet />
      </main>
      {showTabMenu && <TabMenu />}
    </div>
  );
}