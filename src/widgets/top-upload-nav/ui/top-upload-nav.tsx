import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface TopUploadNavProps {
  label?: string;
  disabled?: boolean;
  onSubmit: () => void;
}

export function TopUploadNav({ label = '업로드', disabled = false, onSubmit }: TopUploadNavProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4',
      )}
    >
      <Button variant="icon-nav" size="nav" onClick={() => navigate(-1)}>
        <BackIcon />
      </Button>

      <Button
        variant="upload"
        disabled={disabled}
        onClick={onSubmit}
        className="px-4 py-1.5 text-sm font-semibold"
      >
        {label}
      </Button>
    </header>
  );
}
