import { useProfile } from '@/entities/user';
import {
  PostEditorLayout,
  useEditPostSource,
  useEditPostSubmit,
  usePostContentFocus,
  usePostFormState,
  usePostImageManager,
} from '@/features/post';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

export function EditPostPage() {
  const { postId, post, isPostLoading } = useEditPostSource();
  const { data: profile } = useProfile();

  const initialImages = post?.image
    ? post.image
        .split(',')
        .map((image) => image.trim())
        .filter(Boolean)
    : [];

  const { form, hasContent } = usePostFormState(post?.content ?? '');
  const { isFocused, showError, onFocus, onBlur, handleContentChange } =
    usePostContentFocus(hasContent);
  const {
    images,
    existingImagePaths,
    newImageFiles,
    cleanupPreviewUrls,
    handleImageAdd,
    handleImageRemove,
  } = usePostImageManager(initialImages);
  const { submit, isSubmitting } = useEditPostSubmit(
    postId,
    existingImagePaths,
    newImageFiles,
    cleanupPreviewUrls,
  );

  const contentTextareaProps = form.register('content', {
    required: true,
    onChange: handleContentChange,
  });

  const onSubmit = form.handleSubmit((data) => {
    submit(data.content);
  });

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
      profileImage={profile?.image ?? null}
      onSubmit={onSubmit}
      onImageAdd={handleImageAdd}
      onImageRemove={handleImageRemove}
    />
  );
}
