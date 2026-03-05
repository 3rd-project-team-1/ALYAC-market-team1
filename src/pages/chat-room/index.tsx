import { ChatMessageList, ChatRoomFooter, LeaveRoomModal, useChatRoom } from '@/features/chat';
import { cn } from '@/shared/lib';
import { TopChatNav } from '@/widgets/top-chat-nav';

export function ChatRoomPage() {
  const { messages, showModal, setShowModal, handleSendMessage, handleLeaveRoom } = useChatRoom();

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopChatNav title="이스트 시큐리티 알약" onMoreClick={() => setShowModal(true)} />

      <ChatMessageList messages={messages} />

      <ChatRoomFooter onSubmit={handleSendMessage} />

      {showModal && (
        <LeaveRoomModal onClose={() => setShowModal(false)} onLeave={handleLeaveRoom} />
      )}
    </div>
  );
}
