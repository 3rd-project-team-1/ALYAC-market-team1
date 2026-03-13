import { useMutation } from '@tanstack/react-query';

import { updateProduct } from '../api/updateProduct';
import type { ProductRequest } from '../model/product.schema';

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: ProductRequest }) =>
      updateProduct(productId, data),
  });
}
