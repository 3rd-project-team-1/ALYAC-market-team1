import { useNavigate } from 'react-router-dom';

interface TopChatNavProps {
    title: string;
    onMoreClick?: () => void;
}

export function TopChatNav({ title, onMoreClick }: TopChatNavProps) {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 h-[48px] bg-background flex items-center justify-between px-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors text-foreground"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-foreground">
                {title}
            </span>

            <button
                onClick={onMoreClick}
                className="flex items-center justify-center w-[32px] h-[32px] rounded-md hover:bg-gray-100 transition-colors text-foreground"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1.2" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                    <circle cx="12" cy="19" r="1.2" fill="currentColor" />
                </svg>
            </button>
        </header>
    );
}
