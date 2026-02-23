import { useNavigate } from 'react-router-dom';

interface TopUploadNavProps {
  label?: string;
  disabled?: boolean;
  onSubmit: () => void;
}

export function TopUploadNav({ label = '업로드', disabled = false, onSubmit }: TopUploadNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between px-4">
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

      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors ${disabled ? 'cursor-default bg-[#C4C4C4]' : 'cursor-pointer bg-[#11CC27] hover:bg-[#0fb522]'}`}
      >
        {label}
      </button>
    </header>
  );
}
