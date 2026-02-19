import { useNavigate } from 'react-router-dom';

export function TopMainNav() {
  const navigate = useNavigate();

  return (
    <header className='border-b'>
      <nav className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
        <h1 className='text-base font-semibold'>Home</h1>
        <button
          type='button'
          aria-label='검색'
          onClick={() => navigate('/search')}
          className='rounded-md px-3 py-1.5 text-sm'
        >
          <svg viewBox='0 0 24 24' aria-hidden='true' className='h-5 w-5 fill-none stroke-current stroke-2'>
            <circle cx='11' cy='11' r='7' />
            <path d='M20 20L16.65 16.65' />
          </svg>
        </button>
      </nav>
    </header>
  );
}
