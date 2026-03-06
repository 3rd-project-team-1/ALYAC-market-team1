import { useState } from 'react';

export function useProductImageFile() {
  const [imageFile, setImageFile] = useState<File | undefined>();

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  return {
    imageFile,
    handleImageChange,
  };
}
