import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopUploadNavProps {
  label?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  formId?: string;
}

export function TopUploadNav({
  label = '업로드',
  disabled = false,
  onSubmit,
  formId,
}: TopUploadNavProps) {
  const navigate = useNavigate();

  return (
    <TopHeaderLayout>
      <Button
        aria-label="이전 페이지로 이동"
        variant="icon-nav"
        size="nav"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </Button>

      <Button
        variant="upload"
        disabled={disabled}
        onClick={onSubmit}
        type={formId ? 'submit' : 'button'}
        form={formId}
        className={cn(
          'px-4 py-1.5 text-sm font-semibold',
          'bg-primary-green hover:bg-primary-green-hover active:bg-primary-green-hover',
        )}
      >
        {label}
      </Button>
    </TopHeaderLayout>
  );
}
