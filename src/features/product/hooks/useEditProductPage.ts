import { useProductDetail } from '@/entities/product';

import { useProductFormState } from './useProductFormState';
import { useProductImageFile } from './useProductImageFile';
import { useUpdateProductAction } from './useUpdateProductAction';

export function useEditProductPage(productId: string | undefined) {
  const { product, isLoading: isProductLoading, isError: isProductError } = useProductDetail(productId);

  const { form, handlePriceChange } = useProductFormState(product);
  const { imageFile, handleImageChange } = useProductImageFile();
  const { submit, isSubmitting } = useUpdateProductAction(productId, product?.itemImage);

  const onSubmit = form.handleSubmit((formData) => {
    submit(formData, imageFile);
  });

  return {
    product,
    isProductLoading,
    isProductError,
    form,
    handlePriceChange,
    handleImageChange,
    onSubmit,
    isSubmitting,
  };
}
