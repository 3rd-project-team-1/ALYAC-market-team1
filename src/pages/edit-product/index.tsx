import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { productApi } from '@/entities/product/api';
import type { Product } from '@/entities/product/types';
import { useProfile } from '@/entities/user/hooks/useProfile';
import imageIcon from '@/shared/assets/icons/image.svg';
import { useImageUpload } from '@/shared/hooks/useImageUpload';
import { usePriceInput } from '@/shared/hooks/usePriceInput';
import { uploadSingleImage } from '@/shared/lib/imageUpload';
import { getImageUrl } from '@/shared/lib/utils';
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
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const product = state?.product;

  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const imageFileRef = useRef<File | null>(null);

  const {
    fileInputRef,
    imagePreview,
    handleImageClick,
    handleImageChange: baseHandleImageChange,
  } = useImageUpload(getImageUrl(product?.itemImage) ?? undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) imageFileRef.current = file;
    baseHandleImageChange(e);
  };

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

  const updateMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      let itemImage = product?.itemImage ?? 'uploadFiles/default.png';
      if (imageFileRef.current) {
        itemImage = await uploadSingleImage(imageFileRef.current);
      }

      return productApi.updateProduct(productId!, {
        itemName: data.productName,
        price: Number(data.price),
        link: data.link || `${window.location.origin}/edit-product/${productId}`,
        itemImage,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', profile?.accountname] });
      navigate('/profile');
    },
  });

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col pt-[48px]">
      <TopUploadNav
        label={updateMutation.isPending ? '저장 중...' : '저장'}
        onSubmit={handleSubmit(onSubmit)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 px-6 pt-6">
          {/* 이미지 등록 */}
          <div>
            <p className="text-foreground mb-2 text-sm font-medium">이미지 등록</p>
            <div
              className="bg-muted relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl"
              onClick={handleImageClick}
            >
              {imagePreview && (
                <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
              )}
              <div className="bg-background absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow transition-shadow hover:shadow-md">
                <img src={imageIcon} alt="이미지 등록" width={20} height={20} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* 상품명 */}
          <div className="flex flex-col gap-1">
            <label className="text-foreground text-sm font-bold">상품명</label>
            <input
              {...register('productName', {
                required: '상품명을 입력해주세요.',
                minLength: { value: 2, message: '상품명은 최소 2자 이상이어야 합니다.' },
                maxLength: { value: 15, message: '상품명은 15자 이하여야 합니다.' },
              })}
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
              {...register('price', {
                required: '가격을 입력해주세요.',
                min: { value: 1, message: '가격은 1원 이상이어야 합니다.' },
              })}
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
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/).*/,
                  message: 'http:// 또는 https://로 시작해야 합니다.',
                },
              })}
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
