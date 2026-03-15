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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };
  return (
    <div>
      <label
        htmlFor="product-image-upload"
        className={cn('text-foreground mb-2 block cursor-pointer text-sm font-medium')}
      >
        이미지 등록
      </label>
      <div
        className={cn(
          'bg-muted relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl',
        )}
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="상품 이미지 업로드"
      >
        {previewUrl && (
          <img
            src={getImageUrl(previewUrl) ?? previewUrl}
            alt={`${alt} 미리보기`}
            className={cn('h-full w-full object-cover')}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div
          aria-hidden="true"
          className={cn(
            'bg-background absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow transition-shadow hover:shadow-md',
          )}
        >
          <ImageIcon />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          id="product-image-upload"
          accept="image/*"
          className={cn('hidden')}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
