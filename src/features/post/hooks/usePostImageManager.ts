import { useCallback, useEffect, useState } from 'react';

export function usePostImageManager(initialImages: string[] = []) {
  const [removedInitialIndexes, setRemovedInitialIndexes] = useState<number[]>([]);
  const [addedPreviewUrls, setAddedPreviewUrls] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const cleanupPreviewUrls = useCallback(() => {
    addedPreviewUrls.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  }, [addedPreviewUrls]);

  useEffect(() => {
    return () => cleanupPreviewUrls();
  }, [cleanupPreviewUrls]);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setAddedPreviewUrls((prev) => [...prev, ...previewUrls]);
    setNewImageFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    if (index < remainingInitialEntries.length) {
      const originalIndex = remainingInitialEntries[index].originalIndex;
      setRemovedInitialIndexes((prev) => [...prev, originalIndex]);
      return;
    }

    const addedIndex = index - remainingInitialEntries.length;
    const previewUrl = addedPreviewUrls[addedIndex];

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setAddedPreviewUrls((prev) => prev.filter((_, i) => i !== addedIndex));
    setNewImageFiles((prev) => prev.filter((_, i) => i !== addedIndex));
  };

  const remainingInitialEntries = initialImages
    .map((src, originalIndex) => ({ src, originalIndex }))
    .filter(({ originalIndex }) => !removedInitialIndexes.includes(originalIndex));

  const existingImagePaths = remainingInitialEntries.map(({ src }) => src);
  const images = [...existingImagePaths, ...addedPreviewUrls];

  return {
    images,
    newImageFiles,
    existingImagePaths,
    cleanupPreviewUrls,
    handleImageAdd,
    handleImageRemove,
  };
}
