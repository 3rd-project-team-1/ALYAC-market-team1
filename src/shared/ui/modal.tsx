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
      <div className="fixed inset-0 z-[100] bg-black/60" onClick={onCancel} />
      <div className="bg-background fixed top-1/2 left-1/2 z-[101] w-[252px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] shadow-xl">
        <p className="text-foreground py-6 text-center text-sm">{title}</p>
        <div className="border-border flex border-t">
          <button
            className="text-foreground hover:bg-accent border-border flex-1 border-r py-3 text-sm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="hover:bg-accent flex-1 py-3 text-sm font-medium text-[#11CC27]"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
