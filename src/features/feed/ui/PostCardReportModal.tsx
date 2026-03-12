import { LogoutModal } from '@/shared/ui';

interface PostCardReportModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PostCardReportModal({ isOpen, onConfirm, onCancel }: PostCardReportModalProps) {
  if (!isOpen) return null;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <LogoutModal
        title="신고하시겠습니까?"
        confirmText="신고"
        cancelText="취소"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
}
