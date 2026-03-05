import { useNavigate } from 'react-router-dom';

import { ChatRoomList, DUMMY_CHAT_ROOMS } from '@/features/chat';
import { cn } from '@/shared/lib';
import { TopBasicNav } from '@/widgets/top-basic-nav';

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopBasicNav />
      <ChatRoomList
        rooms={DUMMY_CHAT_ROOMS}
        onRoomClick={(roomId) => navigate(`/chat/${roomId}`)}
      />
    </div>
  );
}
