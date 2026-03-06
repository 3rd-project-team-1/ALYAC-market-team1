import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useProductDetail } from '@/entities/product';
import {
  ProductFormFields,
  ProductImageUploader,
  usePriceInput,
  useProductForm,
} from '@/features/product';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { TopUploadNav } from '@/widgets/top-upload-nav';

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product, isLoading: isProductLoading, isError } = useProductDetail(productId);

  const [imageFile, setImageFile] = useState<File | undefined>();

  const { form, handleSubmit, isLoading: isSubmitting } = useProductForm({ product, productId });

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

  if (isProductLoading) {
    return <LoadingSpinner fullScreen message="상품 정보를 불러오는 중입니다..." />;
  }

  if (isError || !product) {
    return (
      <div className={cn('bg-background flex min-h-screen items-center justify-center')}>
        <p className={cn('text-muted-foreground text-sm')}>상품 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (isSubmitting) {
    return <LoadingSpinner fullScreen message="상품을 수정하는 중입니다..." />;
  }

  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={isSubmitting ? '저장 중...' : '저장'}
        disabled={!form.formState.isValid || isSubmitting}
        onSubmit={onSubmit}
      />
      <form onSubmit={onSubmit}>
        <div className={cn('flex flex-col gap-5 px-6 pt-6')}>
          {/* 이미지 등록 */}
          <ProductImageUploader
            initialImage={getImageUrl(product?.itemImage) ?? undefined}
            onImageChange={handleImageChange}
          />
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
