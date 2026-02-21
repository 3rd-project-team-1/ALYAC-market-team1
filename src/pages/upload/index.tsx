import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import uploadImage from '@/shared/assets/icons/upload-image.svg';

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

  const {
    register,
    handleSubmit,
    control,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { content: state?.content ?? '' },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

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

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormValues) => {
    console.log({ content: data.content, images });
    // TODO: 게시글 업로드 API 연동
    navigate('/feed');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <header
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: '#dbdbdb' }}
      >
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#767676"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="submit"
          form="upload-form"
          disabled={!hasContent}
          className="rounded-full px-5 py-1.5 text-sm font-semibold text-white transition-opacity"
          style={{ backgroundColor: hasContent ? '#3C9E00' : '#C4E4A5' }}
        >
          업로드
        </button>
      </header>

      {/* 본문 */}
      <form id="upload-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-1 gap-3 px-4 pt-5">
        {/* 프로필 아바타 */}
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {/* 텍스트 입력 */}
          <textarea
            {...register('content', { required: true })}
            placeholder="게시글 입력하기..."
            className="w-full resize-none text-sm text-gray-900 outline-none placeholder:text-gray-300"
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
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{ backgroundColor: '#3C9E00' }}
        aria-label="이미지 추가"
      >
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="24" height="24" rx="5" stroke="white" strokeWidth="1.5" />
          <circle cx="9" cy="9.75" r="2.25" stroke="white" strokeWidth="1.5" />
          <path
            d="M1.5 17.25L8.25 11.25L12.75 15.75L17.25 10.5L25.5 18.75"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
