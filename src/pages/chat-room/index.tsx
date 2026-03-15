import { Helmet } from 'react-helmet-async';

import { ChatMessageList, ChatRoomFooter, LeaveRoomModal, useChatRoom } from '@/features/chat';
import { cn } from '@/shared/lib';
import { TopChatNav } from '@/widgets/top-chat-nav';

export function ChatRoomPage() {
  const { messages, showModal, setShowModal, handleSendMessage, handleLeaveRoom } = useChatRoom();

  return (
    <>
      <Helmet>
        <title>이스트 시큐리티 알약님과의 채팅 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
        <TopChatNav title="이스트 시큐리티 알약" onMoreClick={() => setShowModal(true)} />
        <main className="flex flex-1 flex-col overflow-hidden">
          <h1 className="sr-only">이스트 시큐리티 알약님과의 대화창</h1>
          <ChatMessageList messages={messages} />
        </main>
        <ChatRoomFooter onSubmit={handleSendMessage} />
        {showModal && (
          <LeaveRoomModal onClose={() => setShowModal(false)} onLeave={handleLeaveRoom} />
        )}
      </div>
    </>
  );
}
