import { ChangeEvent, useRef, useState } from 'react';

import uploadfile from '@/shared/assets/icons/upload-file.svg';
import uploadimage from '@/shared/assets/icons/upload-image.svg';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface ProfileImageUploaderProps {
  onImageChange: (file: File | null) => void;
  className?: string;
}

export function ProfileImageUploader({ onImageChange, className }: ProfileImageUploaderProps) {
  const DEFAULT_IMAGE = uploadimage;

  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 파일만 업로드 가능합니다.');
      return;
    }
    onImageChange(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn('mb-8 flex justify-center', className)}>
      <Button
        aria-label="프로필 이미지 업로드"
        type="button"
        variant="ghost"
        onClick={handleClick}
        className={cn(
          'group relative h-32 w-32 rounded-full p-0 hover:bg-transparent',
          'focus-visible:ring-2 focus-visible:ring-[#6FCA3C] focus-visible:ring-offset-2',
          'cursor-pointer',
        )}
      >
        {/* 프로필 이미지 미리보기 */}
        <img
          src={preview}
          alt="프로필 이미지"
          className="h-full w-full rounded-full bg-gray-200 object-cover"
        />

        {/* 초록색 사진 아이콘 뱃지 */}
        <div
          className={cn(
            // 1. 기본 위치 및 형태
            'absolute right-0 bottom-0 z-10 flex h-10 w-10 items-center justify-center',
            'rounded-full border-2 border-white text-white',
            'transition-all duration-300',
            '[&_img]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
            'bg-[#6FCA3C] group-hover:brightness-90 hover:brightness-90',
          )}
        >
          <img src={uploadfile} alt="업로드 아이콘" className="h-10 w-10" />
        </div>
      </Button>

      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" // 화면에서 숨김 처리
      />
    </div>
  );
}
