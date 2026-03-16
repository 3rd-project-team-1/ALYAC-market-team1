import { AlertTriangle } from 'lucide-react';

import { cn } from '@/shared/lib';

interface FeedErrorBannerProps {
  isFallbackDone: boolean;
  hasNoPosts: boolean;
  onRetry: () => void;
}

export function FeedErrorBanner({ isFallbackDone, hasNoPosts, onRetry }: FeedErrorBannerProps) {
  const isFailed = isFallbackDone && hasNoPosts;

  return (
    <div className={cn('mx-auto max-w-5xl px-3 pt-[60px]')}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-2.5',
        )}
      >
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/10',
          )}
        >
          <AlertTriangle className={cn('h-3.5 w-3.5 text-muted-foreground')} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn('text-[13px] font-semibold text-foreground')}>
            피드를 불러오는 데 시간이 걸리고 있어요
          </p>
          <p className={cn('mt-0.5 text-[11px] text-muted-foreground')}>
            {isFailed
              ? '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
              : '서버 상태에 따라 게시글을 순차적으로 가져오고 있습니다'}
          </p>
        </div>
        {isFailed && (
          <button
            type="button"
            className={cn(
              'shrink-0 rounded-md bg-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-foreground/20',
            )}
            onClick={onRetry}
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
