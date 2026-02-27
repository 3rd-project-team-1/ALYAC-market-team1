import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { getImageUrl } from '@/shared/lib';

export function useImageUpload(initialImage?: string | null, onImageChange?: (file: File) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(getImageUrl(initialImage));

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 같은 파일 다시 선택 시 onChange 발동하게 초기화
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB 제한
      alert('5MB 이하의 파일만 업로드 가능합니다.');
      return;
    }
    if (onImageChange) {
      onImageChange(file);
    }
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreview(url);
  };

  return { fileInputRef, preview, handleImageClick, handleImageChange };
}
