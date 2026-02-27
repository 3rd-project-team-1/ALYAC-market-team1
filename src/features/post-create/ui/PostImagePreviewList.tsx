interface PostImagePreviewListProps {
  images: string[];
  onRemove: (index: number) => void;
}

export function PostImagePreviewList({ images, onRemove }: PostImagePreviewListProps) {
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {images.map((src, index) => (
        <div key={index} className="relative overflow-hidden rounded-xl">
          <img src={src} alt={`업로드 이미지 ${index + 1}`} className="w-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white"
            aria-label="이미지 삭제"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
