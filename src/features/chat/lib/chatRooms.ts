import type { ChatRoom } from '../model/types';

export const DUMMY_CHAT_ROOMS: ChatRoom[] = [
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
