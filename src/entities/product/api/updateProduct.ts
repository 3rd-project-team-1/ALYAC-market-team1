import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CreateProductInput, ProductResponse } from '../types';

export const updateProduct = (id: string, data: CreateProductInput) =>
  axiosInstance.put<ProductResponse>(API_ENDPOINT.PRODUCT_UPDATE(id), { product: data });
