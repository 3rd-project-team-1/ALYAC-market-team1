import { X } from 'lucide-react';

import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { LogoutModal } from '@/shared/ui';

import { useProfileProductsSection } from '../hooks/useProfileProductsSection';

export function ProfileProductsSection() {
  const {
    products,
    isMyProfile,
    deleteTargetId,
    handleProductClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useProfileProductsSection();

  if (!products || products.length === 0) return null;

  return (
    <section className={cn('border-border border-t px-4 py-4')}>
      <h2 className={cn('text-foreground mb-3 text-sm font-semibold')}>판매 중인 상품</h2>
      <div className={cn('flex gap-3 overflow-x-auto pb-2')}>
        {products.map((product) => (
          <div
            key={product.id}
            className={cn('relative flex-shrink-0 cursor-pointer')}
            onClick={() => handleProductClick(product.id)}
          >
            <div
              className={cn('group bg-muted relative h-[90px] w-[90px] overflow-hidden rounded-xl')}
            >
              <img
                src={getImageUrl(product.itemImage) ?? product.itemImage}
                alt={product.itemName}
                className={cn('h-full w-full object-cover')}
              />

              {isMyProfile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(product.id);
                  }}
                  className={cn(
                    'absolute top-1 right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black/65',
                  )}
                  aria-label="상품 삭제"
                >
                  <X className={cn('h-5 w-5')} strokeWidth={2.25} />
                </button>
              )}
            </div>
            <p className={cn('text-foreground mt-1 max-w-[90px] truncate text-xs font-medium')}>
              {product.itemName}
            </p>
            <p className={cn('text-xs text-[#3C9E00]')}>{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>

      {deleteTargetId && (
        <LogoutModal
          title="상품을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </section>
  );
}
