import { useMutation } from '@tanstack/react-query';

import { createProduct } from '../api';
import { CreateProductInput } from '../types';

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
  });
}
