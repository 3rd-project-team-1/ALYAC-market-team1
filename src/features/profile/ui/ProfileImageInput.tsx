import { UploadFile, UploadImageIcon } from '@/shared/assets';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
import { cn } from '@/shared/lib/utils/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface ProfileImageInputProps {
  onImageChange: (file: File | null) => void;
  className?: string;
  initialImage?: string;
}

export function ProfileImageInput({
  onImageChange,
  className,
  initialImage,
}: ProfileImageInputProps) {
  const { fileInputRef, preview, handleImageClick, handleImageChange } = useImageUpload(
    initialImage,
    onImageChange as (file: File) => void, // 타입 호환을 위해
  );

  return (
    <div className={cn('mb-8 flex justify-center', className)}>
      <Button
        aria-label="프로필 이미지 업로드"
        type="button"
        variant="ghost"
        onClick={handleImageClick}
        className={cn(
          'group relative h-32 w-32 rounded-full p-0 hover:bg-transparent',
          'focus-visible:ring-2 focus-visible:ring-[var(--color-primary-green)] focus-visible:ring-offset-2',
          'cursor-pointer',
        )}
      >
        {/* 프로필 이미지 미리보기 또는 기본 회색 아이콘 */}
        {preview ? (
          <img
            src={preview}
            alt="프로필 이미지"
            className="size-full rounded-full bg-gray-200 object-cover group-hover:brightness-90"
          />
        ) : (
          <div className="flex size-full items-center justify-center overflow-hidden rounded-full bg-gray-200 group-hover:brightness-90">
            <UploadImageIcon className="size-full" />
          </div>
        )}

        {/* 초록색 사진 아이콘 뱃지 */}
        <div
          className={cn(
            'absolute right-0 bottom-0 z-10 flex h-10 w-10 items-center justify-center',
            'rounded-full border-2 border-white text-white',
            'transition-all duration-300',
            '[&_img]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
            'bg-[var(--color-primary-green)] group-hover:brightness-90 hover:brightness-90',
          )}
        >
          <UploadFile className="size-5" />
        </div>
      </Button>

      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
