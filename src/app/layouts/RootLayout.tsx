import { Outlet } from 'react-router-dom';

export function RootLayout() {

  return (
    <div>
      <main className='mx-auto max-w-5xl'>
        <Outlet />
      </main>
    </div>
  );
}