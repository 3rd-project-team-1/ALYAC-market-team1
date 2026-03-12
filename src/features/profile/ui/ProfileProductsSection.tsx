import { useState } from 'react';

import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { ImageIcon } from '@/shared/assets';
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

  const [showAll, setShowAll] = useState(false);

  if (!products || products.length === 0) return null;

  return (
    <section className={cn('border-border border-t px-4 py-4')}>
      {/* 헤더 */}
      <div className={cn('mb-3 flex items-center justify-between')}>
        <h2 className={cn('text-foreground text-sm font-semibold')}>판매 중인 상품</h2>
        <button
          type="button"
          className={cn(
            'flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground',
          )}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? (
            <>접기 <ChevronUp className={cn('h-3.5 w-3.5')} /></>
          ) : (
            <>전체 보기 ({products.length}) <ChevronDown className={cn('h-3.5 w-3.5')} /></>
          )}
        </button>
      </div>

      {/* 상품 목록 */}
      <div
        className={cn(
          'gap-3',
          showAll
            ? 'grid grid-cols-3 sm:grid-cols-4'
            : 'flex overflow-x-auto pb-2',
        )}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              'relative cursor-pointer transition-transform duration-200 hover:scale-[1.03]',
              showAll ? 'w-full' : 'w-[120px] flex-shrink-0',
            )}
            onClick={() => handleProductClick(product.id)}
          >
            <div
              className={cn(
                'group bg-muted relative overflow-hidden rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-lg',
                showAll ? 'w-full' : 'w-[120px]',
              )}
            >
              {/* 이미지 영역 */}
              <div className={cn('bg-muted relative', showAll ? 'aspect-square w-full' : 'h-[120px] w-[120px]')}>
                {/* 이미지 로드 실패 시 플레이스홀더 */}
                <div className={cn('absolute inset-0 flex items-center justify-center')}>
                  <ImageIcon className={cn('text-muted-foreground h-7 w-7')} />
                </div>
                <img
                  src={getImageUrl(product.itemImage) ?? product.itemImage}
                  alt={product.itemName}
                  className={cn('absolute inset-0 h-full w-full object-cover')}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* 삭제 버튼 (내 프로필) */}
                {isMyProfile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(product.id);
                    }}
                    className={cn(
                      'absolute top-1 right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-100 transition-all hover:bg-black/65 active:bg-black/65 md:opacity-0 md:group-hover:opacity-100',
                    )}
                    aria-label="상품 삭제"
                  >
                    <X className={cn('h-5 w-5')} strokeWidth={2.25} />
                  </button>
                )}
              </div>

              {/* 하단 텍스트 영역 */}
              <div className={cn('bg-card px-2 py-1.5')}>
                <p className={cn('text-foreground truncate text-xs font-medium leading-tight')}>
                  {product.itemName}
                </p>
                <p className={cn('truncate text-sm font-bold leading-tight text-[#0a9e1e]')}>
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </div>
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
