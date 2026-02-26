import axiosInstance from '@/shared/api/axios';

/**
 * 이미지 업로드 유틸리티
 */

/**
 * 단일 파일 업로드
 */
export async function uploadSingleImage(file: File): Promise<string> {
  const res = await axiosInstance.post<{ path: string }>(
    '/api/image/uploadfile',
    (() => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    })(),
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data.path;
}

/**
 * 다중 파일 업로드
 */
export async function uploadMultipleImages(files: File[]): Promise<string> {
  if (files.length === 0) return '';

  const formData = new FormData();
  files.forEach((file) => formData.append('image', file));
  const uploadRes = await axiosInstance.post<{ path: string }[]>(
    '/api/image/uploadfiles',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return uploadRes.data.map((f) => f.path).join(',');
}

/**
 * 파일을 Base64로 변환하여 미리보기 생성
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
