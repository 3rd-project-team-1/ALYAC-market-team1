import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';

interface TopUploadNavProps {
  label?: string;
  disabled?: boolean;
  onSubmit: () => void;
}

export function TopUploadNav({ label = '업로드', disabled = false, onSubmit }: TopUploadNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-foreground hover:bg-accent flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors"
      >
        <BackIcon />
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
