import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { ChatRoomList, DUMMY_CHAT_ROOMS } from '@/features/chat';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { TopBasicNav } from '@/widgets/top-basic-nav';

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>채팅 목록 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
        <TopBasicNav />
        <main className="flex-1">
          <h1 className="sr-only">채팅 목록</h1>
          <ChatRoomList
            rooms={DUMMY_CHAT_ROOMS}
            onRoomClick={(roomId) => navigate(ROUTE_PATHS.CHAT_ROOM(roomId))}
          />
        </main>
      </div>
    </>
  );
}
