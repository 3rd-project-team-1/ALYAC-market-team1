import { NavLink } from 'react-router-dom';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/signin', label: 'Sign In' },
  { to: '/signup', label: 'Sign Up' },
  { to: '/feed', label: 'Feed' },
] satisfies NavItem[];

export function SiteHeader() {
  return (
    <header className='border-b'>
      <nav className='mx-auto flex max-w-5xl items-center gap-2 px-4 py-3'>
        {navItems.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                isActive ? 'font-semibold underline underline-offset-4' : 'opacity-80 hover:opacity-100',
              ].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
