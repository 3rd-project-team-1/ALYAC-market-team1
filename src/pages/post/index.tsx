import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import uploadImage from '@/shared/assets/icons/upload-image.svg';

interface Comment {
  id: string;
  author: string;
  accountname: string;
  content: string;
  time: string;
}

// 임시 더미 데이터
const DUMMY_POST = {
  id: '1',
  author: '이스트 시큐리티 알약',
  accountname: '@estSecurity_Alyac',
  content:
    '알려지지 않은 위협의 즉각적인 차단부터 식별, 대응까지. 10년이상의 백신 운영 노하우와 악성코드 분석 전문성을 담은 알약 EDR 솔루션은 위협 인텔리전스와의 결합으로 확장된 엔드포인트 위협 대응 체계를 제공합니다.',
  image: 'https://via.placeholder.com/480x280/111827/ffffff?text=이스트시큐리티',
  likeCount: 58,
  commentCount: 12,
};

const DUMMY_COMMENTS: Comment[] = [
  {
    id: '1',
    author: '이스트 소프트',
    accountname: '5분 전',
    content: '게시글 굿~~!! 최고최고',
    time: '2020년 10월 21일',
  },
  {
    id: '2',
    author: '보안 백신 전문가',
    accountname: '15분 전',
    content:
      '너무 기대됩니다. 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라...',
    time: '',
  },
];

export function PostPage() {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const hasComment = comment.trim().length > 0;

  const handleCommentSubmit = () => {
    if (!hasComment) return;
    // TODO: 댓글 API 연동
    setComment('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 게시글 본문 */}
      <div className="px-4 pt-5">
        {/* 작성자 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
              <img src={uploadImage} alt="프로필" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{DUMMY_POST.author}</p>
              <p className="text-xs text-muted-foreground">{DUMMY_POST.accountname}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            aria-label="더보기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* 게시글 내용 */}
        <p className="mt-4 text-sm leading-relaxed text-foreground">{DUMMY_POST.content}</p>

        {/* 게시글 이미지 */}
        {DUMMY_POST.image && (
          <div className="mt-4 overflow-hidden rounded-xl">
            <img src={DUMMY_POST.image} alt="게시글 이미지" className="w-full object-cover" />
          </div>
        )}

        {/* 좋아요 / 댓글 수 */}
        <div className="mt-3 flex items-center gap-4">
          <button type="button" className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs text-muted-foreground">{DUMMY_POST.likeCount}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs text-muted-foreground">{DUMMY_POST.commentCount}</span>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mt-4 border-t border-border" />

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-4 px-4 py-4">
        {DUMMY_COMMENTS.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
              <img src={uploadImage} alt={c.author} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{c.author}</span>
                <span className="text-xs text-muted-foreground">{c.accountname}</span>
              </div>
              <p className="text-sm text-foreground">{c.content}</p>
              {c.time && <span className="text-xs text-muted-foreground">{c.time}</span>}
            </div>
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              aria-label="더보기"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center gap-3 border-t border-border bg-background px-4 py-3">
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글 달아이지..."
          className="flex-1 bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={handleCommentSubmit}
          disabled={!hasComment}
          className={`text-sm font-medium transition-colors ${hasComment ? 'text-[#3C9E00]' : 'text-[#C4E4A5]'}`}
        >
          게시
        </button>
      </div>

      {/* 게시글 옵션 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-background pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => setShowModal(false)}
            >
              신고하기
            </button>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-destructive hover:bg-accent"
              onClick={() => setShowModal(false)}
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 댓글 옵션 모달 */}
      {showReportModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-background pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => setShowReportModal(false)}
            >
              신고하기
            </button>
            <button
              type="button"
              className="w-full px-6 py-4 text-left text-sm text-destructive hover:bg-accent"
              onClick={() => setShowReportModal(false)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
