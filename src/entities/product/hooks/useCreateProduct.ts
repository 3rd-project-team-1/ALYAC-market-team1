import { useMutation } from '@tanstack/react-query';

import { createProduct } from '../api';
import { CreateProductInput } from '../model/product.schema';

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
  });
}
