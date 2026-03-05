import { useMutation } from '@tanstack/react-query';

import { updateProduct } from '../api';
import type { CreateProductInput } from '../types';

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: CreateProductInput }) =>
      updateProduct(productId, data),
  });
}
