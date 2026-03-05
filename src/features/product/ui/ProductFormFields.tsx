import type { ChangeEvent } from 'react';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { cn } from '@/shared/lib';

import type { ProductFormInput } from '../model/product-from.schema';

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ProductFormFields({ register, errors, onPriceChange }: ProductFormFieldsProps) {
  return (
    <>
      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>상품명</label>
        <input
          {...register('productName')}
          placeholder="2~15자 이내여야 합니다."
          className={cn(
            'text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none',
            errors.productName ? 'border-destructive' : 'border-border',
          )}
        />
        {errors.productName && (
          <p className={cn('text-destructive text-xs')}>{errors.productName.message}</p>
        )}
      </div>

      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>가격</label>
        <input
          {...register('price')}
          placeholder="숫자만 입력 가능합니다."
          inputMode="numeric"
          onChange={onPriceChange}
          className={cn(
            'text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none',
            errors.price ? 'border-destructive' : 'border-border',
          )}
        />
        {errors.price && <p className={cn('text-destructive text-xs')}>{errors.price.message}</p>}
      </div>

      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>판매 링크</label>
        <input
          {...register('link')}
          type="url"
          placeholder="URL을 입력해 주세요."
          className={cn(
            'text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none',
            errors.link ? 'border-destructive' : 'border-border',
          )}
        />
        {errors.link ? (
          <p className={cn('text-destructive text-xs')}>{errors.link.message}</p>
        ) : (
          <p className={cn('text-muted-foreground text-xs')}>http:// 또는 https://로 시작</p>
        )}
      </div>
    </>
  );
}
