import { useRef } from 'react';

import { useLocation } from 'react-router-dom';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { PostImagePreviewList, usePostCreateForm } from '@/features/post-create';
import { UploadFile, UploadImageSmallIcon } from '@/shared/assets';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { TopUploadNav } from '@/widgets/top-upload-nav';

interface LocationState {
  content?: string;
}

export function PostCreatePage() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { profile } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    images,
    isSubmitting,
    hasContent,
    handleImageAdd,
    handleImageRemove,
    submitPost,
  } = usePostCreateForm(state?.content ?? '');

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopUploadNav
        label={isSubmitting ? '업로드 중...' : '업로드'}
        disabled={!hasContent || isSubmitting}
        onSubmit={submitPost}
      />

      {/* 본문 */}
      <form id="upload-form" onSubmit={submitPost} className="flex flex-1 gap-3 px-4 pt-5">
        {/* 프로필 아바타 */}
        <div className="bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          {profile?.image ? (
            <img
              src={getImageUrl(profile.image) ?? profile.image}
              alt="내 프로필"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UploadImageSmallIcon />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {/* 텍스트 입력 */}
          <textarea
            {...register('content', { required: true })}
            placeholder="게시글 입력하기..."
            className="bg-background text-foreground placeholder:text-muted-foreground w-full resize-none text-sm outline-none"
            rows={4}
          />

          {/* 이미지 목록 */}
          <PostImagePreviewList images={images} onRemove={handleImageRemove} />
        </div>
      </form>

      {/* 이미지 추가 버튼 (우하단 고정) */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="fixed right-6 bottom-6 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#11CC27] shadow-lg hover:bg-[#0db322]"
        aria-label="이미지 추가"
      >
        <UploadFile width={30} viewBox="10,10,30,30" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageAdd}
      />
    </div>
  );
}
