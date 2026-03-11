import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { uploadSingleImage } from '@/shared/api';

export function useImageUpload(initialUrl?: string) {
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // 파생 상태: 파일이 선택되었으면 로컬 URL, 아니면 초기 URL 사용
  const previewUrl = file ? objectUrl : (initialUrl ?? null);

  const handleFileChange = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('5MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    setFile(selectedFile);

    const newObjectUrl = URL.createObjectURL(selectedFile);
    setObjectUrl(newObjectUrl);
  };

  // 메모리 누수 방지 (컴포넌트 언마운트 시 URL 해제)
  useEffect(() => {
    return () => {
      if (objectUrl && objectUrl.startsWith('blob:')) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const upload = async (): Promise<string> => {
    // 새 파일이 없으면 기존 URL 반환 (수정 모드 등)
    if (!file) return initialUrl || '';

    // 새 파일 업로드
    return await uploadSingleImage(file);
  };

  return {
    file,
    previewUrl,
    handleFileChange,
    upload,
  };
}
