import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import type { Product } from '@/entities/product';
import {
  ProductFormFields,
  type ProductFormValues,
  ProductImageUploader,
  usePriceInput,
  useProductForm,
} from '@/features/product';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
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
  const { mutation, isLoading } = useProductForm({ product, productId });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductFormValues>({
    mode: 'onChange',
    defaultValues: {
      productName: product?.itemName ?? '',
      price: product?.price?.toString() ?? '',
      link: product?.link ?? '',
    },
  });

  const { handlePriceChange } = usePriceInput('price', setValue, setError, clearErrors);

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = (data: ProductFormValues) => {
    mutation.mutate({ ...data, imageFile });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="상품을 수정하는 중입니다..." />;
  }

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopUploadNav
        label={isLoading ? '저장 중...' : '저장'}
        disabled={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 px-6 pt-6">
          {/* 이미지 등록 */}
          <ProductImageUploader initialImage={preview} onImageChange={handleImageChange} />

          <ProductFormFields
            register={register}
            errors={errors}
            onPriceChange={handlePriceChange}
          />
        </div>
      </form>
    </div>
  );
}
