import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import type { Product } from '@/entities/product/types';
import { getImageUrl } from '@/features/image/lib/getImageUrl';
import { usePriceInput } from '@/features/product/hooks/usePriceInput';
import { useProductForm } from '@/features/product/hooks/useProductForm';
import { validationRules } from '@/features/product/lib/validationRules';
import { ProductImageUploader } from '@/features/product/ui/ProductImageUploader';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { TopUploadNav } from '@/widgets/top-upload-nav';

type FormValues = {
  productName: string;
  price: string;
  link: string;
};

interface LocationState {
  product?: Product;
}

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const product = state?.product;

  const [imageFile, setImageFile] = useState<File | undefined>();
  const { imagePreview } = useImageUpload(getImageUrl(product?.itemImage) ?? undefined);
  const { mutation, isLoading } = useProductForm({ product, productId });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
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

  const onSubmit = (data: FormValues) => {
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
          <ProductImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} />

          {/* 상품명 */}
          <div className="flex flex-col gap-1">
            <label className="text-foreground text-sm font-bold">상품명</label>
            <input
              {...register('productName', validationRules.productName)}
              placeholder="2~15자 이내여야 합니다."
              className={`text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none ${errors.productName ? 'border-destructive' : 'border-border'}`}
            />
            {errors.productName && (
              <p className="text-destructive text-xs">{errors.productName.message}</p>
            )}
          </div>

          {/* 가격 */}
          <div className="flex flex-col gap-1">
            <label className="text-foreground text-sm font-bold">가격</label>
            <input
              {...register('price', validationRules.price)}
              placeholder="숫자만 입력 가능합니다."
              inputMode="numeric"
              onChange={handlePriceChange}
              className={`text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none ${errors.price ? 'border-destructive' : 'border-border'}`}
            />
            {errors.price && <p className="text-destructive text-xs">{errors.price.message}</p>}
          </div>

          {/* 판매 링크 */}
          <div className="flex flex-col gap-1">
            <label className="text-foreground text-sm font-bold">판매 링크</label>
            <input
              {...register('link', validationRules.link)}
              type="url"
              placeholder="URL을 입력해 주세요."
              className={`text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none ${errors.link ? 'border-destructive' : 'border-border'}`}
            />
            {errors.link ? (
              <p className="text-destructive text-xs">{errors.link.message}</p>
            ) : (
              <p className="text-muted-foreground text-xs">
                선택 사항 (http:// 또는 https://로 시작)
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
