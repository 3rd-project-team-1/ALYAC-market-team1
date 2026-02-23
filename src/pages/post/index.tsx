import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { Button } from '@/shared/ui/button';

type FormValues = {
  content: string;
};

export function PostPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { content: '' },
  });

  const content = useWatch({ control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  const onSubmit = (data: FormValues) => {
    navigate('/upload', { state: { content: data.content } });
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
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!hasContent}
          className={`rounded-full px-5 py-1.5 text-sm font-semibold text-white ${hasContent ? 'bg-[#3C9E00] hover:bg-[#2d7a00]' : 'bg-[#C4E4A5]'}`}
        >
          업로드
        </Button>
      </header>

      {/* 본문 */}
      <form className="flex flex-1 gap-3 px-4 pt-5">
        {/* 프로필 아바타 */}
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          <img src={uploadImage} alt="내 프로필" className="h-full w-full object-cover" />
        </div>

        {/* 텍스트 입력 */}
        <textarea
          {...register('content', { required: true })}
          placeholder="게시글 입력하기."
          className="flex-1 resize-none bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground"
          rows={5}
        />
      </form>

      {/* 이미지 업로드 버튼 (우하단 고정) */}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={!hasContent}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#3C9E00] shadow-lg hover:bg-[#2d7a00] disabled:bg-[#C4E4A5]"
        aria-label="이미지 업로드"
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
    </div>
  );
}
