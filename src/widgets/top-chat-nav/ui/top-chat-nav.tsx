import { useNavigate } from 'react-router-dom';

interface TopChatNavProps {
  title: string;
  onMoreClick?: () => void;
}

export function TopChatNav({ title, onMoreClick }: TopChatNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
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

      <span className="text-foreground text-base font-semibold">
        {title}
      </span>

      <button
        onClick={onMoreClick}
        className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
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
