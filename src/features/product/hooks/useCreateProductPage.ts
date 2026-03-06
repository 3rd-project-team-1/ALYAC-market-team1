import { useCreateProductAction } from './useCreateProductAction';
import { useProductFormState } from './useProductFormState';
import { useProductImageFile } from './useProductImageFile';

export function useCreateProductPage() {
  const { form, handlePriceChange } = useProductFormState();
  const { imageFile, handleImageChange } = useProductImageFile();
  const { submit, isSubmitting } = useCreateProductAction();

  const onSubmit = form.handleSubmit((formData) => {
    submit(formData, imageFile);
  });

  return {
    form,
    handlePriceChange,
    handleImageChange,
    onSubmit,
    isSubmitting,
  };
}
