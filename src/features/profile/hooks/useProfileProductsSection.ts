import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

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
      deleteProductMutation.mutate(deleteTargetId);
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
