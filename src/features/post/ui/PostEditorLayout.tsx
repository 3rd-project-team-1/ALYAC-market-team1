import { useRef } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { UploadFile, UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { TopUploadNav } from '@/widgets/top-upload-nav';

import { PostImagePreviewList } from './PostImagePreviewList';

interface PostEditorLayoutProps {
  submitLabel: string;
  isSubmitting: boolean;
  hasContent: boolean;
  textareaProps: UseFormRegisterReturn;
  isFocused: boolean;
  showError: boolean;
  onContentFocus: () => void;
  onContentBlur: () => void;
  images: string[];
  profileImage?: string;
  onSubmit: () => void;
  onImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
}

export function PostEditorLayout({
  submitLabel,
  isSubmitting,
  hasContent,
  textareaProps,
  isFocused,
  showError,
  onContentFocus,
  onContentBlur,
  images,
  profileImage,
  onSubmit,
  onImageAdd,
  onImageRemove,
}: PostEditorLayoutProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={submitLabel}
        disabled={!hasContent || isSubmitting}
        onSubmit={onSubmit}
      />

      <form onSubmit={onSubmit} className={cn('flex flex-1 gap-3 px-4 pt-5')}>
        <div className={cn('bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-full')}>
          {profileImage ? (
            <img
              src={getImageUrl(profileImage) ?? profileImage}
              alt="내 프로필"
              className={cn('h-full w-full object-cover')}
            />
          ) : (
            <div className={cn('flex h-full w-full items-center justify-center')}>
              <UploadImageSmallIcon />
            </div>
          )}
        </div>

        <div className={cn('flex flex-1 flex-col gap-2')}>
          <div
            className={cn(
              'overflow-hidden rounded-lg border-2 transition-all',
              isFocused ? 'border-blue-900 dark:border-[oklch(0.75_0.15_250)]' : 'border-transparent',
            )}
          >
            <textarea
              {...textareaProps}
              placeholder="게시글 입력하기..."
              className={cn(
                'bg-background text-foreground placeholder:text-muted-foreground min-h-[300px] w-full resize-none p-2 text-sm outline-none',
              )}
              onFocus={onContentFocus}
              onBlur={onContentBlur}
            />
          </div>

          {showError && <p className={cn('text-xs text-red-500')}>게시글 내용을 입력해주세요.</p>}

          <PostImagePreviewList images={images} onRemove={onImageRemove} />
        </div>
      </form>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'fixed right-6 bottom-6 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#11CC27] shadow-lg hover:bg-[#0db322]',
        )}
        aria-label="이미지 추가"
      >
        <UploadFile width={30} viewBox="10,10,30,30" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className={cn('hidden')}
        onChange={onImageAdd}
      />
    </div>
  );
}
