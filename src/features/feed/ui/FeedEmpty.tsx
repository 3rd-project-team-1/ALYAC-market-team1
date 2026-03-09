import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface FeedEmptyProps {
  /** 검색 페이지로 이동하는 핸들러 */
  onSearch: () => void;
}

/**
 * 팔로우 중인 유저가 없거나 피드에 게시글이 없을 때 표시되는 빈 상태 컴포넌트입니다.
 *
 * 유저에게 팔로우할 계정을 검색하도록 유도합니다.
 */
export function FeedEmpty({ onSearch }: FeedEmptyProps) {
  return (
    <main className={cn('mx-auto flex h-screen max-w-5xl flex-col items-center justify-center')}>
      <p className={cn('text-lg text-gray-500')}>유저를 검색해 팔로우 해보세요!</p>
      {/* 검색 페이지로 이동하는 CTA 버튼 */}
      <Button onClick={onSearch} variant="outline" className={cn('mt-4')}>
        검색하기
      </Button>
    </main>
  );
}
