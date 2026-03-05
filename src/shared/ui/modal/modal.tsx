import { cn } from '@/shared/lib';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

export function LogoutModal({
  onConfirm,
  onCancel,
  title = '',
  confirmText = '',
  cancelText = '',
}: LogoutModalProps) {
  return (
    <>
      <div className={cn('fixed inset-0 z-[100] bg-black/60')} onClick={onCancel} />
      <div
        className={cn(
          'bg-background fixed top-1/2 left-1/2 z-[101] w-[252px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] shadow-xl',
        )}
      >
        <p className={cn('text-foreground py-6 text-center text-sm')}>{title}</p>
        <div className={cn('border-border flex border-t')}>
          <button
            className={cn(
              'text-foreground hover:bg-accent border-border flex-1 border-r py-3 text-sm',
            )}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={cn('hover:bg-accent flex-1 py-3 text-sm font-medium text-[#11CC27]')}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
