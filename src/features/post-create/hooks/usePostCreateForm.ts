import { useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { postApi } from '@/entities/post';
import { fileToBase64, uploadMultipleImages } from '@/features/image/lib/imageUpload';

export interface PostCreateFormValues {
  content: string;
}

export function usePostCreateForm(defaultContent = '') {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control } = useForm<PostCreateFormValues>({
    mode: 'onChange',
    defaultValues: { content: defaultContent },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    for (const file of files) {
      const base64 = await fileToBase64(file);
      setImages((prev) => [...prev, base64]);
    }

    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitPost = async (data: PostCreateFormValues) => {
    setIsSubmitting(true);
    try {
      const imagePaths = await uploadMultipleImages(imageFiles);
      const res = await postApi.createPost(data.content, imagePaths);
      navigate(`/post/${res.data.post.id}`);
    } catch (error) {
      console.error('게시글 업로드 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    images,
    isSubmitting,
    hasContent,
    handleImageAdd,
    handleImageRemove,
    submitPost,
  };
}
