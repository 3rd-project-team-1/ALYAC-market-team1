import { useMutation } from '@tanstack/react-query';

import { createProduct } from '../api/createProduct';

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}
