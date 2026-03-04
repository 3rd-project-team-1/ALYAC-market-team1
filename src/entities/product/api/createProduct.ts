import axiosInstance from '@/shared/api/axios';

import type { CreateProductInput, ProductResponse } from '../types';

export const createProduct = (data: CreateProductInput) =>
  axiosInstance.post<ProductResponse>('/api/product', { product: data });
