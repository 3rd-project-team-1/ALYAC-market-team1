import { useRef } from 'react';

import imageIcon from '@/shared/assets/icons/image.svg';

interface ProductImageUploaderProps {
  imagePreview: string | null | undefined;
  onImageChange: (file: File) => void;
  alt?: string;
}

/**
 * 상품 이미지 업로드 컴포넌트
 * create-product, edit-product에서 사용
 */
export function ProductImageUploader({
  imagePreview,
  onImageChange,
  alt = '상품 이미지',
}: ProductImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
    e.target.value = '';
  };

  return (
    <div>
      <p className="text-foreground mb-2 text-sm font-medium">이미지 등록</p>
      <div
        className="bg-muted relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl"
        onClick={handleImageClick}
      >
        {imagePreview && (
          <img src={imagePreview} alt={alt} className="h-full w-full object-cover" />
        )}
        <div className="bg-background absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow transition-shadow hover:shadow-md">
          <img src={imageIcon} alt="이미지 등록" width={20} height={20} />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
