import { useNavigate } from 'react-router-dom';

interface TopUploadNavProps {
    label?: string;
    disabled?: boolean;
    onSubmit: () => void;
}

export function TopUploadNav({ label = '업로드', disabled = false, onSubmit }: TopUploadNavProps) {
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

            <button
                onClick={onSubmit}
                disabled={disabled}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-colors
          ${disabled ? 'bg-[#C4C4C4] cursor-default' : 'bg-[#11CC27] cursor-pointer hover:bg-[#0fb522]'}`}
            >
                {label}
            </button>
        </header>
    );
}
