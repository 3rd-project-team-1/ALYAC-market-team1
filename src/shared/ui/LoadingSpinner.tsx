/**
 * 로딩 스피너 컴포넌트
 * 모든 페이지에서 일관된 로딩 표시
 */

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export function LoadingSpinner({
  fullScreen = false,
  message = '로딩 중...',
}: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="border-muted border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="bg-background flex h-screen items-center justify-center">{content}</div>;
  }

  return <div className="flex flex-1 items-center justify-center">{content}</div>;
}
