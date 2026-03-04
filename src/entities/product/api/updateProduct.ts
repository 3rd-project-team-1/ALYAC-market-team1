import axiosInstance from '@/shared/api/axios';

import type { CreateProductInput, ProductResponse } from '../types';

export const updateProduct = (id: string, data: CreateProductInput) =>
  axiosInstance.put<ProductResponse>(`/api/product/${id}`, { product: data });
