import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import uploadFile from '@/shared/assets/icons/upload-file.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { Button } from '@/shared/ui/button';

interface LocationState {
  content?: string;
}

type FormValues = {
  content: string;
};

export function UploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [images, setImages] = useState<string[]>([]);
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
    // 같은 파일 재선택 가능하도록 초기화
    e.target.value = '';
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormValues) => {
    console.log({ content: data.content, images });
    // TODO: 게시글 업로드 API 연동
    navigate('/feed');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Button
          type="submit"
          form="upload-form"
          disabled={!hasContent}
          className={`rounded-full px-5 py-1.5 text-sm font-semibold text-white ${hasContent ? 'bg-[#3C9E00] hover:bg-[#2d7a00]' : 'bg-[#C4E4A5]'}`}
        >
          업로드
        </Button>
      </header>

      {/* 본문 */}
      <form id="upload-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-1 gap-3 px-4 pt-5">
        {/* 프로필 아바타 */}
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {/* 텍스트 입력 */}
          <textarea
            {...register('content', { required: true })}
            placeholder="게시글 입력하기..."
            className="w-full resize-none bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground"
            rows={4}
          />

          {/* 이미지 목록 */}
          {images.length > 0 && (
            <div className="flex flex-col gap-3">
              {images.map((src, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl">
                  <img src={src} alt={`업로드 이미지 ${index + 1}`} className="w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white"
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
        className="fixed bottom-6 right-6 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#11CC27] shadow-lg hover:bg-[#0db322]"
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
