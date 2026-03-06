import { useEditPostPage } from '@/features/edit-post';
import { PostEditorLayout } from '@/features/post-editor';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

export function EditPostPage() {
  const {
    post,
    profileImage,
    isPostLoading,
    isFocused,
    showError,
    onFocus,
    onBlur,
    hasContent,
    images,
    isSubmitting,
    contentTextareaProps,
    onSubmit,
    handleImageAdd,
    handleImageRemove,
  } = useEditPostPage();

  if (isPostLoading) {
    return <LoadingSpinner fullScreen message="게시글을 불러오는 중입니다..." />;
  }

  if (!post) {
    return (
      <div className={cn('bg-background flex h-screen items-center justify-center')}>
        <p className={cn('text-muted-foreground text-sm')}>게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <PostEditorLayout
      submitLabel={isSubmitting ? '수정 중...' : '수정'}
      isSubmitting={isSubmitting}
      hasContent={hasContent}
      textareaProps={contentTextareaProps}
      isFocused={isFocused}
      showError={showError}
      onContentFocus={onFocus}
      onContentBlur={onBlur}
      images={images}
      profileImage={profileImage}
      onSubmit={onSubmit}
      onImageAdd={handleImageAdd}
      onImageRemove={handleImageRemove}
    />
  );
}
