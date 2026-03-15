import { Helmet } from 'react-helmet-async';

import { ProductForm, useCreateProductPage } from '@/features/product';
import { LoadingSpinner } from '@/shared/ui';

export function CreateProductPage() {
  const { form, handleImageChange, onSubmit, isSubmitting } = useCreateProductPage();

  if (isSubmitting) {
    return <LoadingSpinner fullScreen message="상품을 등록하는 중입니다..." />;
  }

  return (
    <>
      <Helmet>
        <title>상품 등록 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main>
        <h1 className="sr-only">판매 상품 등록하기</h1>

        <ProductForm
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onImageChange={handleImageChange}
        />
      </main>
    </>
  );
}
