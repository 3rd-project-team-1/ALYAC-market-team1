import { UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

import type { ChatRoom } from '../model/types';

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
            className={cn(
              'border-border hover:bg-accent flex w-full items-center gap-3 border-b px-4 py-4 text-left',
            )}
            onClick={() => onRoomClick(room.id)}
          >
            <div className={cn('relative flex-shrink-0')}>
              <div className={cn('bg-muted h-10 w-10 overflow-hidden rounded-full')}>
                <UploadImageSmallIcon className={cn('h-full w-full object-cover')} />
              </div>
              {room.isOnline && (
                <span
                  className={cn(
                    'absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-[#11cc27]',
                  )}
                />
              )}
            </div>

            <div className={cn('flex flex-1 flex-col gap-0.5 overflow-hidden')}>
              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-foreground text-sm font-medium')}>{room.name}</span>
                <span className={cn('text-muted-foreground text-xs')}>{room.date}</span>
              </div>
              <p className={cn('text-muted-foreground truncate text-xs')}>{room.lastMessage}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
