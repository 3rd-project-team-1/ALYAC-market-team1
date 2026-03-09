import { ProductEditorForm, useCreateProductPage } from '@/features/product';
import { LoadingSpinner } from '@/shared/ui';

export function CreateProductPage() {
  const { form, handlePriceChange, handleImageChange, onSubmit, isSubmitting } =
    useCreateProductPage();

  if (isSubmitting) {
    return <LoadingSpinner fullScreen message="상품을 등록하는 중입니다..." />;
  }

  return (
    <ProductEditorForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onImageChange={handleImageChange}
      onPriceChange={handlePriceChange}
    />
  );
}
