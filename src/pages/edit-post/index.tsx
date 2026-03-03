import { useRef } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { postApi } from '@/entities/post/api';
import type { Post } from '@/entities/post/types';
import { PostImagePreviewList } from '@/features/post-create';
import { uploadMultipleImages } from '@/shared/api';
import { UploadFile } from '@/shared/assets';
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control } = useForm<PostEditFormValues>({
    mode: 'onChange',
    defaultValues: { content: post?.content ?? '' },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  const updatePostMutation = useMutation({
    mutationFn: async (data: PostEditFormValues) => {
      const existingImages = post?.image ?? '';
      return postApi.updatePost(postId!, data.content, existingImages);
    },
    onSuccess: (res) => {
      toast.success('게시글이 수정되었습니다');
      navigate(`/post/${res.data.post.id}`, { replace: true });
    },
    onError: () => {
      toast.error('게시글 수정에 실패했습니다');
    },
  });

  const submitPost = handleSubmit((data) => updatePostMutation.mutate(data));

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopUploadNav
        label={updatePostMutation.isPending ? '저장 중...' : '저장'}
        disabled={!hasContent || updatePostMutation.isPending}
        onSubmit={submitPost}
      />

      <form id="edit-post-form" onSubmit={submitPost} className="flex flex-1 gap-3 px-4 pt-5">
        <div className="flex flex-1 flex-col gap-4">
          <textarea
            {...register('content', { required: true })}
            placeholder="게시글 입력하기..."
            className="bg-background text-foreground placeholder:text-muted-foreground w-full resize-none text-sm outline-none"
            rows={4}
          />

          {post?.image && (
            <PostImagePreviewList
              images={post.image.split(',').map((img) => img.trim())}
              onRemove={() => {}}
            />
          )}
        </div>
      </form>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="fixed right-6 bottom-6 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#11CC27] shadow-lg hover:bg-[#0db322]"
        aria-label="이미지 추가"
      >
        <UploadFile width={30} viewBox="10,10,30,30" />
      </button>

      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" />
    </div>
  );
}
