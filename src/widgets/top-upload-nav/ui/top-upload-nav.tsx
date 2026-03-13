import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopUploadNavProps {
  label?: string;
  disabled?: boolean;
  onSubmit: () => void;
}

export function TopUploadNav({ label = '업로드', disabled = false, onSubmit }: TopUploadNavProps) {
  const navigate = useNavigate();

  return (
    <TopHeaderLayout>
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
    </TopHeaderLayout>
  );
}
