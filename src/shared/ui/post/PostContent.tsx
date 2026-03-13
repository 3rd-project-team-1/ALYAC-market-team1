import { cn } from '@/shared/lib';

interface PostContentProps {
  content: string;
  className?: string;
  onClick?: () => void;
}

export function PostContent({ content, className }: PostContentProps) {
  return (
    <p className={cn('text-foreground text-sm leading-relaxed whitespace-pre-wrap', className)}>
      {content}
    </p>
  );
}
