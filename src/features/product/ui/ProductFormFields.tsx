import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { cn } from '@/shared/lib';

import type { ProductFormInput } from '../model/product-from.schema';

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

export function ProductFormFields({ register, errors }: ProductFormFieldsProps) {
  const priceRegister = register('price', {
    onChange: (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    },
  });

  return (
    <>
      {/* --- 상품명 구역 --- */}
      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>상품명</label>
        <input
          {...register('productName')}
          placeholder="2~15자 이내여야 합니다."
          aria-invalid={!!errors.productName}
          aria-describedby={errors.productName ? 'name-error' : undefined}
          className={cn(
            'text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none',
            errors.productName ? 'border-destructive' : 'border-border',
          )}
        />
        {errors.productName && (
          <p className={cn('text-destructive text-xs')}>{errors.productName.message}</p>
        )}
      </div>
      {/* --- 가격 구역 --- */}
      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>가격</label>
        <input
          {...priceRegister}
          placeholder="숫자만 입력 가능합니다."
          inputMode="numeric"
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? 'price-error' : undefined}
          className={cn(
            'text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none',
            errors.price ? 'border-destructive' : 'border-border',
          )}
        />
        {errors.price && <p className={cn('text-destructive text-xs')}>{errors.price.message}</p>}
      </div>
      {/* --- 판매 링크 구역 --- */}
      <div className={cn('flex flex-col gap-1')}>
        <label className={cn('text-foreground text-sm font-bold')}>판매 링크</label>
        <input
          {...register('link')}
          type="url"
          placeholder="URL을 입력해 주세요."
          aria-invalid={!!errors.link}
          aria-describedby={errors.link ? 'link-error' : 'link-guide'}
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
