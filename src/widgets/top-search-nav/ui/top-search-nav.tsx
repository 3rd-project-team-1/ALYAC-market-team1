import { useNavigate } from 'react-router-dom';

interface TopSearchNavProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export function TopSearchNav({ searchValue, onSearchChange }: TopSearchNavProps) {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 h-[48px] bg-background flex items-center px-4 gap-2">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors text-foreground"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <input
                type="text"
                placeholder="계정 검색"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="flex-1 h-[32px] px-3 rounded-full bg-background text-xs text-black dark:text-white placeholder:text-gray-400 placeholder:text-xs outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400/60"
            />
        </header>
    );
}
