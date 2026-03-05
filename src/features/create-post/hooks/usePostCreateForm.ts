import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { createPost } from '@/entities/post';
import { uploadMultipleImages } from '@/shared/api';

import { type CreatePostInput, createPostSchema } from '../model/create-post.schema';

export function usePostCreateForm(defaultContent = '') {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const { register, handleSubmit, control } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
    defaultValues: { content: defaultContent },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;
  const cleanupUrls = useCallback(() => {
    images.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  }, [images]);

  useEffect(() => {
    return () => cleanupUrls();
  }, [cleanupUrls]);

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostInput) => {
      const imagePaths = await uploadMultipleImages(imageFiles);
      const imageString = imagePaths.join(',');
      return createPost(data.content, imageString);
    },
    onSuccess: (res) => {
      cleanupUrls();
      toast.success('게시글이 업로드되었습니다');
      navigate(`/post/${res.data.post.id}`);
    },
    onError: (error) => {
      console.error('게시글 업로드 실패:', error);
      toast.error('게시글 업로드에 실패했습니다');
    },
  });

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previewUrls]);
    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    if (images[index].startsWith('blob:')) {
      URL.revokeObjectURL(images[index]);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitPost = handleSubmit((data) => createPostMutation.mutate(data));

  return {
    register,
    images,
    isSubmitting: createPostMutation.isPending,
    hasContent,
    handleImageAdd,
    handleImageRemove,
    submitPost,
  };
}
