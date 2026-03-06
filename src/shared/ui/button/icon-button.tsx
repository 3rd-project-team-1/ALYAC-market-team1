import { cn } from '@/shared/lib';

interface IconButtonProps {
  label: string;
  active?: boolean;
  Icon: React.ComponentType<{ active: boolean }>;
  onClick: () => void;
  className?: string;
  labelClassName?: string;
}

export const IconButton = ({
  label,
  active = false,
  Icon,
  onClick,
  className,
  labelClassName,
}: IconButtonProps) => (
  <button
    onClick={onClick}
    className={cn('flex cursor-pointer flex-col items-center gap-0.5 transition-colors', className)}
  >
    <Icon active={active} />
    <span className={cn('text-[12px] whitespace-nowrap transition-colors', labelClassName)}>
      {label}
    </span>
  </button>
);
