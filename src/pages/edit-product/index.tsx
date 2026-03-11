import { useParams } from 'react-router-dom';

import { ProductForm, useEditProductPage } from '@/features/product';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();

  const {
    product,
    isProductLoading,
    isProductError,
    form,
    handleImageChange,
    onSubmit,
    isSubmitting,
  } = useEditProductPage(productId);

  if (isProductLoading) {
    return <LoadingSpinner fullScreen message="상품 정보를 불러오는 중입니다..." />;
  }

  if (isProductError || !product) {
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
    <ProductForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onImageChange={handleImageChange}
      initialImage={product.itemImage}
    />
  );
}
