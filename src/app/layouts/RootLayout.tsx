import { Outlet } from 'react-router-dom';

import { SiteHeader } from '@/widgets/site-header';

export function RootLayout() {
	return (
		<div className='min-h-screen'>
			<SiteHeader />
			<main className='mx-auto max-w-5xl px-4 py-6'>
				<Outlet />
			</main>
		</div>
	);
}
