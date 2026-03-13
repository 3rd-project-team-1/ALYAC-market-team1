import { cn } from '@/shared/lib';

interface FeedErrorBannerProps {
  isFallbackDone: boolean;
  hasNoPosts: boolean;
  onRetry: () => void;
}

export function FeedErrorBanner({ isFallbackDone, hasNoPosts, onRetry }: FeedErrorBannerProps) {
  const isFailed = isFallbackDone && hasNoPosts;

  return (
    <div className={cn('mx-auto max-w-5xl px-4 pt-[60px]')}>
      <div className={cn('rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm')}>
        <p className={cn('font-medium text-yellow-800')}>일시적인 서버 오류가 발생했습니다</p>
        <p className={cn('mt-0.5 text-xs text-yellow-600')}>
          {isFailed
            ? '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
            : '게시글을 하나씩 천천히 불러오고 있습니다...'}
        </p>
        {isFailed && (
          <button
            type="button"
            className={cn('mt-2 text-xs font-medium text-yellow-700 underline')}
            onClick={onRetry}
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
