import { UploadImageSmallIcon } from '@/shared/assets';

import type { ChatRoom } from '@/features/chat/lib/chatRooms';

interface ChatRoomListProps {
  rooms: ChatRoom[];
  onRoomClick: (roomId: string) => void;
}

export function ChatRoomList({ rooms, onRoomClick }: ChatRoomListProps) {
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <button
            type="button"
            className="border-border hover:bg-accent flex w-full items-center gap-3 border-b px-4 py-4 text-left"
            onClick={() => onRoomClick(room.id)}
          >
            <div className="relative flex-shrink-0">
              <div className="bg-muted h-10 w-10 overflow-hidden rounded-full">
                <UploadImageSmallIcon className="h-full w-full object-cover" />
              </div>
              {room.isOnline && (
                <span className="border-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 bg-[#3C9E00]" />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm font-medium">{room.name}</span>
                <span className="text-muted-foreground text-xs">{room.date}</span>
              </div>
              <p className="text-muted-foreground truncate text-xs">{room.lastMessage}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
