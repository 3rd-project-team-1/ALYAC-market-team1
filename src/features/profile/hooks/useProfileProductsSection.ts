import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteProduct, useUserProducts } from '@/entities/product';
import { ROUTE_PATHS } from '@/shared/router';

import { useProfileTargetAccount } from './useProfileTargetAccount';

export function useProfileProductsSection() {
  const navigate = useNavigate();
  const { targetAccountname, isMyProfile } = useProfileTargetAccount();

  const { products } = useUserProducts(targetAccountname);
  const deleteProductMutation = useDeleteProduct(targetAccountname ?? null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    navigate(ROUTE_PATHS.EDIT_PRODUCT(productId));
  };

  const handleDeleteClick = (productId: string) => {
    setDeleteTargetId(productId);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId && !deleteProductMutation.isPending) {
      deleteProductMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success('상품이 삭제되었습니다.');
        },
        onError: () => {
          toast.error('상품 삭제에 실패했습니다.');
        },
      });
    }
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetId(null);
  };

  return {
    products,
    isMyProfile,
    deleteTargetId,
    handleProductClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
