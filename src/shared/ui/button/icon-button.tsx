import { cn } from '@/shared/lib';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  Icon: React.ComponentType<{ active: boolean }>;
  className?: string;
  labelClassName?: string;
}

export const IconButton = ({
  label,
  active = false,
  Icon,
  className,
  labelClassName,
  ...props
}: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    className={cn(
      'flex cursor-pointer flex-col items-center gap-0.5 transition-colors',
      'focus-visible:ring-primary-green focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      className,
    )}
    {...props}
  >
    <div aria-hidden="true">
      <Icon active={active} />
    </div>
    <span
      aria-hidden="true"
      className={cn('text-[12px] whitespace-nowrap transition-colors', labelClassName)}
    >
      {label}
    </span>
  </button>
);
