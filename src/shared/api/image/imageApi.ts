import { axiosInstance } from '@/shared/api';

export interface ImageUploadResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
// 단일 이미지 업로드 API
export const uploadSingleImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post<ImageUploadResponse>(
    '/api/image/uploadfile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.path;
};

// 다중 이미지 업로드 API
export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await axiosInstance.post<ImageUploadResponse[]>(
    '/api/image/uploadfiles',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.map((img) => img.path);
};
