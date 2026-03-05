import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type Product, useCreateProduct, useUpdateProduct } from '@/entities/product';
import { useProfile } from '@/entities/user';
import { uploadSingleImage } from '@/shared/api';

import { type ProductFormInput, productFormSchema } from '../model/product-from.schema';

interface UseProductFormOptions {
  product?: Product;
  productId?: string;
}

export function useProductForm(options: UseProductFormOptions = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const { product, productId } = options;

  const isEdit = !!productId;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: {
      productName: product?.itemName ?? '',
      price: product?.price?.toString() ?? '',
      link: product?.link ?? '',
    },
  });

  const handleSubmit = async (imageFile?: File) => {
    const formData = form.getValues();
    let itemImage = product?.itemImage ?? 'uploadFiles/default.png';
    if (imageFile) {
      try {
        itemImage = await uploadSingleImage(imageFile);
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다');
        console.log(error);
        return;
      }
    }

    const submitData = {
      itemName: formData.productName,
      price: Number(formData.price),
      link: formData.link,
      itemImage,
    };

    if (isEdit) {
      updateMutation.mutate(
        { productId: productId!, data: submitData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', profile?.accountname] });
            toast.success('상품이 수정되었습니다');
            navigate('/profile');
          },
          onError: () => {
            toast.error('상품 수정에 실패했습니다');
          },
        },
      );
    } else {
      createMutation.mutate(submitData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products', profile?.accountname] });
          toast.success('상품이 등록되었습니다');
          navigate('/profile');
        },
        onError: () => {
          toast.error('상품 등록에 실패했습니다');
        },
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
}
