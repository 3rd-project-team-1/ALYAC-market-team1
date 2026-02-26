interface LeaveRoomModalProps {
  onClose: () => void;
  onLeave: () => void;
}

export function LeaveRoomModal({ onClose, onLeave }: LeaveRoomModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-background w-full max-w-md rounded-t-2xl pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center py-3">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>

        <button
          type="button"
          className="text-foreground hover:bg-accent w-full px-6 py-4 text-left text-sm"
          onClick={onLeave}
        >
          채팅방 나가기
        </button>
      </div>
    </div>
  );
}
