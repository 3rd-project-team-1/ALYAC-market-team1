import { useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import type { Product } from '@/entities/product';
import {
  ProductFormFields,
  ProductImageUploader,
  usePriceInput,
  useProductForm,
} from '@/features/product';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { LoadingSpinner } from '@/shared/ui';
import { TopUploadNav } from '@/widgets/top-upload-nav';

interface LocationState {
  product?: Product;
}

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const product = state?.product;

  const [imageFile, setImageFile] = useState<File | undefined>();
  const { preview } = useImageUpload(getImageUrl(product?.itemImage) ?? undefined);
  const { form, handleSubmit, isLoading } = useProductForm({ product, productId });

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
    return <LoadingSpinner fullScreen message="상품을 수정하는 중입니다..." />;
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
