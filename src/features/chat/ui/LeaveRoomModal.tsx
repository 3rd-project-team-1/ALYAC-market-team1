interface LeaveRoomModalProps {
  onClose: () => void;
  onLeave: () => void;
}

export function LeaveRoomModal({ onClose, onLeave }: LeaveRoomModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-[100]" onClick={onClose} />
      <div className="bg-background fixed top-[52px] right-4 z-[101] min-w-[160px] overflow-hidden rounded-lg shadow-lg">
        <div className="flex justify-center py-2">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>
        <button
          type="button"
          className="text-foreground hover:bg-accent w-full px-4 py-3 text-left text-sm"
          onClick={() => {
            onLeave();
            onClose();
          }}
        >
          채팅방 나가기
        </button>
      </div>
    </>
  );
}
