import { useNavigate } from 'react-router-dom';

export function TopBasicNav() {
  const navigate = useNavigate();

  return (
    <header className='border-b'>
      <nav className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
        <button type='button' aria-label='뒤로가기' onClick={() => navigate(-1)} className='rounded-md px-3 py-1.5 text-sm'>
          ←
        </button>
        <button type='button' aria-label='메뉴' className='rounded-md px-3 py-1.5 text-sm'>
          ☰
        </button>
      </nav>
    </header>
  );
}