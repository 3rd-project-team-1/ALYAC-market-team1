import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { TopChatNav } from '@/widgets/top-chat-nav';

import { ChatRoomFooter } from './ChatRoomFooter';
import type { ChatMessage } from './model/types';
import { ChatMessageList } from './ui/ChatMessageList';
import { LeaveRoomModal } from './ui/LeaveRoomModal';

const DUMMY_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    content:
      '지능형 사이버 위협에 가장 실효적으로 대응할 수 있는 당일의 기업의 안상코드 위협 대응 솔루션이 것는지 공급하여 연락드렸습니다.',
    isMine: false,
    time: '12:39',
  },
  {
    id: '2',
    content: '시간날 때 확인 후에 답 변부탁세요.',
    isMine: false,
    time: '12:41',
  },
  {
    id: '3',
    content: 'Treat Inside 입니다.',
    isMine: true,
    time: '12:50',
    image: 'https://via.placeholder.com/280x180/111827/ffffff?text=Treat+Inside',
  },
];

export function ChatRoomPage() {
  const navigate = useNavigate();
  const idCounterRef = useRef(DUMMY_MESSAGES.length);
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES);
  const [showModal, setShowModal] = useState(false);

  // 메시지 전송 핸들러
  const handleSendMessage = (text: string) => {
    idCounterRef.current += 1;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMessage: ChatMessage = {
      id: String(idCounterRef.current),
      content: text,
      isMine: true,
      time,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // 채팅방 나가기
  const handleLeaveRoom = () => {
    setShowModal(false);
    navigate('/chat');
  };

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopChatNav title="이스트 시큐리티 알약" onMoreClick={() => setShowModal(true)} />

      <ChatMessageList messages={messages} />

      {/* 채팅 입력창 */}
      <ChatRoomFooter onSubmit={handleSendMessage} />

      {/* 채팅방 나가기 모달 */}
      {showModal && (
        <LeaveRoomModal onClose={() => setShowModal(false)} onLeave={handleLeaveRoom} />
      )}
    </div>
  );
}
