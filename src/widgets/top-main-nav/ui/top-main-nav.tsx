import { useNavigate } from 'react-router-dom';

interface TopMainNavProps {
  title: string;
}

export function TopMainNav({ title }: TopMainNavProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-background flex items-center justify-between px-4 border-b border-border">
      <span className="text-base font-semibold text-black dark:text-white">{title}</span>
      <button
        onClick={() => navigate('/search')}
        className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.9999 21L16.6499 16.65" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </header>
  );
}