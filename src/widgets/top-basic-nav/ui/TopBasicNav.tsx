import { useNavigate } from 'react-router-dom';

interface TopBasicNavProps {
  onMore?: () => void;
}

export function TopBasicNav({ onMore }: TopBasicNavProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-white flex items-center justify-between px-4 left-0 righ-0">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={onMore}
        className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="1.2" fill="#222" />
          <circle cx="12" cy="12" r="1.2" fill="#222" />
          <circle cx="12" cy="19" r="1.2" fill="#222" />
        </svg>
      </button>
    </header>
  );
}