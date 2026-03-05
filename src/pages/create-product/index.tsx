import { useState } from 'react';

import {
  ProductFormFields,
  ProductImageUploader,
  usePriceInput,
  useProductForm,
} from '@/features/product';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { TopUploadNav } from '@/widgets/top-upload-nav';

export function CreateProductPage() {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const { preview } = useImageUpload();
  const { form, handleSubmit, isLoading } = useProductForm();

  const { handlePriceChange } = usePriceInput(
    'price',
    form.setValue,
    form.setError,
    form.clearErrors,
  );

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };
  const onSubmit = form.handleSubmit(() => {
    handleSubmit(imageFile);
  });
  if (isLoading) {
    return <LoadingSpinner fullScreen message="상품을 등록하는 중입니다..." />;
  }

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={isLoading ? '저장 중...' : '저장'}
        disabled={!form.formState.isValid || isLoading}
        onSubmit={onSubmit}
      />
      <form onSubmit={onSubmit}>
        <div className={cn('flex flex-col gap-5 px-6 pt-6')}>
          {/* 이미지 등록 */}
          <ProductImageUploader initialImage={preview} onImageChange={handleImageChange} />
          <ProductFormFields
            register={form.register}
            errors={form.formState.errors}
            onPriceChange={handlePriceChange}
          />
        </div>
      </form>
    </div>
  );
}
