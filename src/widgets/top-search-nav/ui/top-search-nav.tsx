import { useNavigate } from 'react-router-dom';

interface TopSearchNavProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TopSearchNav({ searchValue, onSearchChange }: TopSearchNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background fixed top-0 right-0 left-0 flex h-[48px] items-center gap-2 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <input
        type="text"
        placeholder="계정 검색"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
        className="bg-background h-[32px] flex-1 rounded-full border border-transparent px-3 text-xs text-black outline-none placeholder:text-xs placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/60 dark:text-white"
      />
    </header>
  );
}
