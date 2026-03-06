import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useUpdateProduct } from '@/entities/product';
import { useProfile } from '@/entities/user';
import { uploadSingleImage } from '@/shared/api';

import type { ProductFormInput } from '../model/product-from.schema';

export function useUpdateProductAction(productId: string | undefined, initialImage?: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const updateMutation = useUpdateProduct();

  const submit = async (formData: ProductFormInput, imageFile?: File) => {
    if (!productId) {
      return;
    }

    let itemImage = initialImage ?? 'uploadFiles/default.png';

    if (imageFile) {
      try {
        itemImage = await uploadSingleImage(imageFile);
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다');
        console.log(error);
        return;
      }
    }

    updateMutation.mutate(
      {
        productId,
        data: {
          itemName: formData.productName,
          price: Number(formData.price),
          link: formData.link,
          itemImage,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products', profile?.accountname] });
          queryClient.invalidateQueries({ queryKey: ['product', productId] });
          toast.success('상품이 수정되었습니다');
          navigate('/profile');
        },
        onError: () => {
          toast.error('상품 수정에 실패했습니다');
        },
      },
    );
  };

  return {
    submit,
    isSubmitting: updateMutation.isPending,
  };
}
