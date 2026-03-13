import { AlertTriangle, RotateCcw } from 'lucide-react';

import { cn } from '@/shared/lib';

interface FeedErrorBannerProps {
  isFallbackDone: boolean;
  hasNoPosts: boolean;
}

/**
 * 피드 서버 오류 발생 시 표시되는 안내 배너 컴포넌트입니다. (GitHub 아이콘 카드 스타일)
 *
 * - rounded-2xl 카드 + 원형 아이콘 배지
 * - 복구 중: 제목 + 설명 2줄
 * - 복구 실패: 오른쪽 정렬 pill 버튼 노출
 */
export function FeedErrorBanner({ isFallbackDone, hasNoPosts }: FeedErrorBannerProps) {
  const isFailed = isFallbackDone && hasNoPosts;

  return (
    <div className={cn('mx-auto max-w-5xl px-4 pt-[60px]')}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 shadow-sm',
        )}
      >
        {/* 원형 아이콘 배지 */}
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600',
          )}
        >
          <AlertTriangle className={cn('h-3.5 w-3.5 text-white')} />
        </span>

        {/* 텍스트 */}
        <div className={cn('min-w-0 flex-1')}>
          <p className={cn('text-[13px] font-semibold text-gray-800')}>
            피드를 불러오는 데 시간이 걸리고 있어요
          </p>
          <p className={cn('mt-0.5 text-[11px] text-gray-400')}>
            {isFailed
              ? '잠시 후 다시 시도해 주세요'
              : '서버 상태에 따라 게시글을 순차적으로 가져오고 있습니다'}
          </p>
        </div>

        {/* 다시 시도 버튼 (복구 실패 시에만 노출) */}
        {isFailed && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700',
            )}
          >
            <RotateCcw className={cn('h-3 w-3')} />
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
