import { useRef } from 'react';

import { ImageIcon } from '@/shared/assets';
import { useImageUpload } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

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
  const { previewUrl, handleFileChange } = useImageUpload(initialImage ?? undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file); // 내부 미리보기 업데이트
      onImageChange(file); // 부모에게 파일 전달
    }
  };

  return (
    <div>
      <p className={cn('text-foreground mb-2 text-sm font-medium')}>이미지 등록</p>
      <div
        className={cn(
          'bg-muted relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl',
        )}
        onClick={handleContainerClick}
      >
        {previewUrl && (
          <img
            src={getImageUrl(previewUrl) ?? previewUrl}
            alt={alt}
            className={cn('h-full w-full object-cover')}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
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
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
