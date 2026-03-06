import type { ChangeEvent } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import { cn } from '@/shared/lib';
import { TopUploadNav } from '@/widgets/top-upload-nav';

import type { ProductFormInput } from '../model/product-from.schema';
import { ProductFormFields } from './ProductFormFields';
import { ProductImageUploader } from './ProductImageUploader';

interface ProductFormProps {
  form: UseFormReturn<ProductFormInput>;
  onSubmit: () => void;
  isSubmitting: boolean;
  onImageChange: (file: File) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  initialImage?: string;
}

export function ProductForm({
  form,
  onSubmit,
  isSubmitting,
  onImageChange,
  onPriceChange,
  initialImage,
}: ProductFormProps) {
  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopUploadNav
        label={isSubmitting ? '저장 중...' : '저장'}
        disabled={!form.formState.isValid || isSubmitting}
        onSubmit={onSubmit}
      />

      <form onSubmit={onSubmit}>
        <div className={cn('flex flex-col gap-5 px-6 pt-6')}>
          <ProductImageUploader initialImage={initialImage} onImageChange={onImageChange} />
          <ProductFormFields
            register={form.register}
            errors={form.formState.errors}
            onPriceChange={onPriceChange}
          />
        </div>
      </form>
    </div>
  );
}
