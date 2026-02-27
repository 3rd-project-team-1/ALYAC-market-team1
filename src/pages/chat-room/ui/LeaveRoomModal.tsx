import { ListModal } from '@/shared/ui/modal-list';

interface LeaveRoomModalProps {
  onClose: () => void;
  onLeave: () => void;
}

export function LeaveRoomModal({ onClose, onLeave }: LeaveRoomModalProps) {
  return (
    <ListModal
      onClose={onClose}
      items={[{ label: '채팅방 나가기', onClick: onLeave }]}
    />
  );
}
