import { CloseIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { Button } from '@/shared/ui';

interface PostImagePreviewListProps {
  images: string[];
  onRemove: (index: number) => void;
}

export function PostImagePreviewList({ images, onRemove }: PostImagePreviewListProps) {
  if (images.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-3')}>
      {images.map((src, index) => (
        <div key={index} className={cn('relative overflow-hidden rounded-xl')}>
          <img
            src={getImageUrl(src) ?? src}
            alt={`업로드 이미지 ${index + 1}`}
            className={cn('w-full object-cover')}
          />
          <Button
            type="button"
            size="icon-sm"
            onClick={() => onRemove(index)}
            className={cn(
              'absolute top-2 right-2 rounded-full bg-black/50 text-white hover:bg-black/70',
            )}
            aria-label="이미지 삭제"
          >
            <CloseIcon />
          </Button>
        </div>
      ))}
    </div>
  );
}
