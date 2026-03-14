import { Helmet } from 'react-helmet-async';

import { useProfile } from '@/entities/user';
import {
  PostEditorLayout,
  useCreatePostAction,
  useCreatePostInitialContent,
  usePostContentFocus,
  usePostFormState,
  usePostImageManager,
} from '@/features/post';
import type { CreatePostInput } from '@/features/post/model/create-post.schema';

export function PostCreatePage() {
  const { initialContent } = useCreatePostInitialContent();
  const { data: profile } = useProfile();

  const { form, hasContent } = usePostFormState(initialContent);
  const { isFocused, showError, onFocus, onBlur, handleContentChange } =
    usePostContentFocus(hasContent);
  const { images, newImageFiles, cleanupPreviewUrls, handleImageAdd, handleImageRemove } =
    usePostImageManager();
  const { submit, isSubmitting } = useCreatePostAction(newImageFiles, cleanupPreviewUrls);

  const contentTextareaProps = form.register('content', {
    required: true,
    onChange: handleContentChange,
  });

  const onSubmit = form.handleSubmit((data: CreatePostInput) => {
    submit(data.content);
  });

  return (
    <>
      <Helmet>
        <title>게시글 작성 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" /> {/* 작성 페이지는 절대 노출 금지 */}
      </Helmet>

      <main>
        <h1 className="sr-only">게시글 작성하기</h1>

        <PostEditorLayout
          submitLabel={isSubmitting ? '업로드 중...' : '업로드'}
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
      </main>
    </>
  );
}
