import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CreateProductInput, ProductResponse } from '../types';

export const createProduct = (data: CreateProductInput) =>
  axiosInstance.post<ProductResponse>(API_ENDPOINT.PRODUCT_CREATE, { product: data });
