import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { productApi } from '@/entities/product/api';
import type { Product } from '@/entities/product/types';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { uploadSingleImage } from '@/features/image/lib/imageUpload';

interface UseProductFormOptions {
  product?: Product;
  productId?: string;
  onSuccess?: () => void;
}

interface ProductFormData {
  productName: string;
  price: string;
  link: string;
}

/**
 * 상품 등록/수정 폼 로직 커스텀 훅
 * create-product, edit-product에서 공유
 */
export function useProductForm(options: UseProductFormOptions = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const { product, productId, onSuccess } = options;

  const isEdit = !!productId;

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData & { imageFile?: File }) => {
      const { imageFile, ...formData } = data;

      // 이미지 업로드 처리
      let itemImage = product?.itemImage ?? 'uploadFiles/default.png';
      if (imageFile) {
        itemImage = await uploadSingleImage(imageFile);
      }

      // 기본 링크 설정
      const link =
        formData.link ||
        `${window.location.origin}/${isEdit ? 'edit-product' : 'create-product'}${isEdit ? '/' + productId : ''}`;

      const submitData = {
        itemName: formData.productName,
        price: Number(formData.price),
        link,
        itemImage,
      };

      // API 호출 (등록 또는 수정)
      if (isEdit) {
        return productApi.updateProduct(productId!, submitData);
      } else {
        return productApi.createProduct(submitData);
      }
    },
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['products', profile?.accountname] });

      // 콜백 실행
      onSuccess?.();

      // 프로필 페이지로 이동
      navigate('/profile');
    },
  });

  return {
    mutation,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
