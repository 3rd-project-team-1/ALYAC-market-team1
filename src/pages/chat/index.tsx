import { useNavigate } from 'react-router-dom';

import uploadImage from '@/shared/assets/icons/upload-image.svg';

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  isOnline: boolean;
}

// 임시 더미 데이터
const DUMMY_CHAT_ROOMS: ChatRoom[] = [
  {
    id: '1',
    name: '이스트 시큐리티',
    lastMessage: '언제 출시 되나요?',
    date: '2020.10.25',
    isOnline: true,
  },
  {
    id: '2',
    name: '이스트 소프트',
    lastMessage: '궁금한 것이 있어 안배드릴겁니다. 이번에 알...',
    date: '2020.10.25',
    isOnline: true,
  },
  {
    id: '3',
    name: '보안 백신 전문가',
    lastMessage: '오늘 시간되시나요? 어쩌볼 것이 있습니다. 이...',
    date: '2020.10.25',
    isOnline: false,
  },
];

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <header
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: '#dbdbdb' }}
      >
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#767676"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" aria-label="더보기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="#767676" />
            <circle cx="12" cy="12" r="1.5" fill="#767676" />
            <circle cx="19" cy="12" r="1.5" fill="#767676" />
          </svg>
        </button>
      </header>

      {/* 채팅 목록 */}
      <ul>
        {DUMMY_CHAT_ROOMS.map((room) => (
          <li key={room.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-gray-50"
              style={{ borderBottom: '1px solid #f0f0f0' }}
              onClick={() => navigate(`/chat/${room.id}`)}
            >
              {/* 아바타 + 온라인 표시 */}
              <div className="relative flex-shrink-0">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                  <img src={uploadImage} alt={room.name} className="h-full w-full object-cover" />
                </div>
                {room.isOnline && (
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: '#3C9E00' }}
                  />
                )}
              </div>

              {/* 채팅 정보 */}
              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{room.name}</span>
                  <span className="text-xs text-gray-400">{room.date}</span>
                </div>
                <p className="truncate text-xs text-gray-400">{room.lastMessage}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
