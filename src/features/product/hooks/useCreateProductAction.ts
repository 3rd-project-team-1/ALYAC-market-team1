import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreateProduct } from '@/entities/product';
import { productQueryKeys } from '@/entities/product';
import { useProfile } from '@/entities/user';
import { uploadSingleImage } from '@/shared/api';
import { ROUTE_PATHS } from '@/shared/routes';

import type { ProductFormInput } from '../model/product-from.schema';

export function useCreateProductAction() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useProfile();
  const createMutation = useCreateProduct();

  const submit = async (formData: ProductFormInput, imageFile?: File) => {
    let itemImage = 'uploadFiles/default.png';

    if (imageFile) {
      try {
        itemImage = await uploadSingleImage(imageFile);
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다');
        console.log(error);
        return;
      }
    }

    createMutation.mutate(
      {
        itemName: formData.productName,
        price: Number(formData.price),
        link: formData.link,
        itemImage,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: productQueryKeys.products(profile?.accountname),
          });
          toast.success('상품이 등록되었습니다');
          navigate(ROUTE_PATHS.PROFILE);
        },
        onError: () => {
          toast.error('상품 등록에 실패했습니다');
        },
      },
    );
  };

  return {
    submit,
    isSubmitting: createMutation.isPending,
  };
}
