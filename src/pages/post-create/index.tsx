import { useRef, useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { postApi } from '@/entities/post/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import axiosInstance from '@/shared/api/axios';
import uploadFile from '@/shared/assets/icons/upload-file.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { getImageUrl } from '@/shared/lib/utils';
import { TopUploadNav } from '@/widgets/top-upload-nav';

interface LocationState {
  content?: string;
}

type FormValues = {
  content: string;
};

export function PostCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { profile } = useProfile();

  const [images, setImages] = useState<string[]>([]); // 미리보기용 base64
  const [imageFiles, setImageFiles] = useState<File[]>([]); // 실제 업로드용 File
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { content: state?.content ?? '' },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  // 이미지 추가 핸들러
  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // 이미지 업로드
      let imagePaths = '';
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append('image', file));
        const uploadRes = await axiosInstance.post<{ path: string }[]>(
          '/api/image/uploadfiles',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        imagePaths = uploadRes.data.map((f) => f.path).join(',');
      }

      // 게시글 작성
      const res = await postApi.createPost(data.content, imagePaths);
      navigate(`/post/${res.data.post.id}`);
    } catch (error) {
      console.error('게시글 업로드 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopUploadNav
        label={isSubmitting ? '업로드 중...' : '업로드'}
        disabled={!hasContent || isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      />

      {/* 본문 */}
      <form
        id="upload-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 gap-3 px-4 pt-5"
      >
        {/* 프로필 아바타 */}
        <div className="bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <img
            src={getImageUrl(profile?.image) ?? uploadImage}
            alt="내 프로필"
            className="h-full w-full object-cover"
          />
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
          {images.length > 0 && (
            <div className="flex flex-col gap-3">
              {images.map((src, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt={`업로드 이미지 ${index + 1}`}
                    className="w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white"
                    aria-label="이미지 삭제"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 1L13 13M13 1L1 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* 이미지 추가 버튼 (우하단 고정) */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="fixed right-6 bottom-6 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#11CC27] shadow-lg hover:bg-[#0db322]"
        aria-label="이미지 추가"
      >
        <img src={uploadFile} alt="upload-file" />
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
