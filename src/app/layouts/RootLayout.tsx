import { Outlet, useLocation, useMatches } from 'react-router-dom';

import { TopBasicNav } from '@/widgets/top-basic-nav';
import { TopMainNav } from '@/widgets/top-main-nav';

export function RootLayout() {
  const matches = useMatches();
  const location = useLocation();

  const isNotFoundPage = matches.some(match => match.id === 'not-found');
  const isHomePage = location.pathname === '/';

  return (
    <div className='min-h-screen'>
      {!isNotFoundPage && (isHomePage ? <TopMainNav /> : <TopBasicNav />)}
      <main className='mx-auto max-w-5xl px-4 py-6'>
        <Outlet />
      </main>
    </div>
  );
}