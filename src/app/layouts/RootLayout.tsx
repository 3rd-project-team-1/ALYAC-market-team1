import { Outlet, useMatches } from 'react-router-dom';
import { TopBasicNav } from '@/widgets/top-basic-nav';

export function RootLayout() {
  const matches = useMatches();
  const isNotFoundPage = matches.some(match => match.id === 'not-found');

  return (
    <div className='min-h-screen'>
      {!isNotFoundPage && <TopBasicNav />}
      <main className='mx-auto max-w-5xl px-4 py-6'>
        <Outlet />
      </main>
    </div>
  );
}
