import { ImageIcon } from '@/shared/assets';
import { useImageUpload } from '@/shared/hooks';
import { cn } from '@/shared/lib';

interface ProductImageUploaderProps {
  initialImage?: string | null;
  onImageChange: (file: File) => void;
  alt?: string;
}

/**
 * 상품 이미지 업로드 컴포넌트
 * create-product, edit-product에서 사용
 */
export function ProductImageUploader({
  initialImage,
  onImageChange,
  alt = '상품 이미지',
}: ProductImageUploaderProps) {
  const { fileInputRef, preview, handleImageClick, handleImageChange } = useImageUpload(
    initialImage,
    onImageChange,
  );

  return (
    <div>
      <p className={cn('text-foreground mb-2 text-sm font-medium')}>이미지 등록</p>
      <div
        className={cn(
          'bg-muted relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl',
        )}
        onClick={handleImageClick}
      >
        {preview && <img src={preview} alt={alt} className={cn('h-full w-full object-cover')} />}
        <div
          className={cn(
            'bg-background absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow transition-shadow hover:shadow-md',
          )}
        >
          <ImageIcon />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={cn('hidden')}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
