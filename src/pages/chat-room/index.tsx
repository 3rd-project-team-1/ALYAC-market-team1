import { useCallback, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import uploadImage from '@/shared/assets/icons/upload-image.svg';

interface Message {
  id: string;
  content: string;
  isMine: boolean;
  time: string;
  image?: string;
}

type FormValues = {
  message: string;
};

const DUMMY_MESSAGES: Message[] = [
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
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: { message: '' },
  });

  const messageValue = useWatch({ control, name: 'message' });
  const hasMessage = messageValue?.trim().length > 0;

  // 메시지 전송 핸들러
  const onSubmit = useCallback(
    (data: FormValues) => {
      if (!data.message.trim()) return;
      idCounterRef.current += 1;
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const newMessage: Message = {
        id: String(idCounterRef.current),
        content: data.message.trim(),
        isMine: true,
        time,
      };
      setMessages((prev) => [...prev, newMessage]);
      reset();
    },
    [reset],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void handleSubmit(onSubmit)(e as React.BaseSyntheticEvent);
    },
    [handleSubmit, onSubmit],
  );

  // 채팅방 나가기
  const handleLeaveRoom = () => {
    setShowModal(false);
    navigate('/chat');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-base font-medium text-foreground">이스트 시큐리티 알약</h1>
        <button type="button" onClick={() => setShowModal(true)} aria-label="더보기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="19" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* 메시지 목록 */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* 상대방 아바타 */}
            {!msg.isMine && (
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                <img src={uploadImage} alt="상대방 프로필" className="h-full w-full object-cover" />
              </div>
            )}

            <div className={`flex flex-col gap-1 ${msg.isMine ? 'items-end' : 'items-start'}`}>
              {/* 말풍선 */}
              <div
                className={`max-w-[240px] px-4 py-2.5 text-sm ${
                  msg.isMine
                    ? 'rounded-[18px_18px_4px_18px] bg-[#3C9E00] text-white'
                    : 'rounded-[18px_18px_18px_4px] bg-muted text-foreground'
                }`}
              >
                {msg.content}
              </div>

              {/* 이미지 첨부 */}
              {msg.image && (
                <div className="max-w-[240px] overflow-hidden rounded-xl">
                  <img src={msg.image} alt="첨부 이미지" className="w-full object-cover" />
                </div>
              )}

              {/* 시간 */}
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-3 border-t border-border px-4 py-3"
      >
        {/* 내 아바타 */}
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>

        {/* 입력창 */}
        <input
          {...register('message')}
          placeholder="메시지 입력하기..."
          className="flex-1 bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        {/* 전송 버튼 */}
        <button
          type="submit"
          disabled={!hasMessage}
          className={`text-sm font-medium transition-colors ${hasMessage ? 'text-[#3C9E00]' : 'text-[#C4E4A5]'}`}
        >
          전송
        </button>
      </form>

      {/* 채팅방 나가기 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-background pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들 바 */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-foreground hover:bg-accent"
              onClick={handleLeaveRoom}
            >
              채팅방 나가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
