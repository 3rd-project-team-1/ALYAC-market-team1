import { useCallback, useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { postApi } from '@/entities/post/api';
import type { Post } from '@/entities/post/types';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { PostImagePreviewList } from '@/features/create-post';
import { uploadMultipleImages } from '@/shared/api';
import { UploadFile, UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { TopUploadNav } from '@/widgets/top-upload-nav';

interface PostEditFormValues {
  content: string;
}

interface LocationState {
  post?: Post;
}

export function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const post = state?.post;

  const { profile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>(() =>
    post?.image ? post.image.split(',').map((img) => img.trim()).filter(Boolean) : [],
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const cleanupUrls = useCallback(() => {
    images.forEach((url) => {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    });
  }, [images]);

  useEffect(() => {
    return () => cleanupUrls();
  }, [cleanupUrls]);

  const { register, handleSubmit, control } = useForm<PostEditFormValues>({
    mode: 'onChange',
    defaultValues: { content: post?.content ?? '' },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  const updatePostMutation = useMutation({
    mutationFn: async (data: PostEditFormValues) => {
      const newImagePaths =
        imageFiles.length > 0 ? await uploadMultipleImages(imageFiles) : [];
      const existingPaths = images.filter((img) => !img.startsWith('blob:'));
      const allImages = [...existingPaths, ...newImagePaths].join(',');
      return postApi.updatePost(postId!, data.content, allImages);
    },
    onSuccess: (res) => {
      cleanupUrls();
      toast.success('게시글이 수정되었습니다');
      navigate(`/post/${res.data.post.id}`, { replace: true });
    },
    onError: () => {
      toast.error('게시글 수정에 실패했습니다');
    },
  });

  const submitPost = handleSubmit((data) => updatePostMutation.mutate(data));

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previewUrls]);
    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    const url = images[index];
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
      const blobIndex = images.slice(0, index).filter((img) => img.startsWith('blob:')).length;
      setImageFiles((prev) => prev.filter((_, i) => i !== blobIndex));
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={updatePostMutation.isPending ? '수정 중...' : '수정'}
        disabled={!hasContent || updatePostMutation.isPending}
        onSubmit={submitPost}
      />

      <form id="edit-post-form" onSubmit={submitPost} className={cn('flex flex-1 gap-3 px-4 pt-5')}>
        {/* 프로필 아바타 */}
        <div className={cn('bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-full')}>
          {profile?.image ? (
            <img
              src={getImageUrl(profile.image) ?? profile.image}
              alt="내 프로필"
              className={cn('h-full w-full object-cover')}
            />
          ) : (
            <div className={cn('flex h-full w-full items-center justify-center')}>
              <UploadImageSmallIcon />
            </div>
          )}
        </div>

        <div className={cn('flex flex-1 flex-col gap-4')}>
          <textarea
            {...register('content', { required: true })}
            placeholder="게시글 입력하기..."
            className={cn(
              'bg-background text-foreground placeholder:text-muted-foreground w-full resize-none text-sm outline-none',
            )}
            rows={4}
          />

          {images.length > 0 && (
            <PostImagePreviewList images={images} onRemove={handleImageRemove} />
          )}
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
        onChange={handleImageAdd}
      />
    </div>
  );
}
