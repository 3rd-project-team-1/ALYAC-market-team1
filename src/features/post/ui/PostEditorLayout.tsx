import { useRef } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { UploadFile } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { UserAvatar } from '@/shared/ui';
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
  profileImage: string | null;
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
  const textareaId = 'post-content-textarea';
  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={submitLabel}
        disabled={!hasContent || isSubmitting}
        onSubmit={onSubmit}
      />

      <form onSubmit={onSubmit} className={cn('flex flex-1 gap-3 px-4 pt-5')}>
        <UserAvatar src={profileImage} username="내 프로필" className="h-10 w-10" />

        <div className={cn('flex flex-1 flex-col gap-2')}>
          <label htmlFor={textareaId} className="sr-only">
            게시글 내용 작성
          </label>
          <div
            className={cn(
              'overflow-hidden rounded-lg border-2 transition-all',
              isFocused
                ? 'border-blue-900 dark:border-[oklch(0.75_0.15_250)]'
                : 'border-transparent',
            )}
          >
            <textarea
              {...textareaProps}
              id={textareaId}
              placeholder="게시글 입력하기..."
              className={cn(
                'bg-background text-foreground placeholder:text-muted-foreground min-h-[300px] w-full resize-none p-2 text-sm outline-none',
              )}
              onFocus={onContentFocus}
              onBlur={onContentBlur}
              aria-invalid={showError}
              aria-describedby={showError ? 'post-error-message' : undefined}
            />
          </div>

          {showError && (
            <p id="post-error-message" className={cn('text-xs text-red-500')} role="alert">
              게시글 내용을 입력해주세요.
            </p>
          )}
          <PostImagePreviewList images={images} onRemove={onImageRemove} />
        </div>
      </form>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'fixed right-6 bottom-6 flex h-[50px] w-[50px] items-center justify-center rounded-full',
          'bg-primary-green hover:bg-primary-green-hover',
        )}
        aria-label="이미지 추가"
      >
        <UploadFile width={30} viewBox="10,10,30,30" />
      </button>

      <input
        ref={fileInputRef}
        id="post-image-upload-input"
        type="file"
        accept="image/*"
        multiple
        className={cn('hidden')}
        onChange={onImageAdd}
        aria-hidden="true"
      />
    </div>
  );
}
