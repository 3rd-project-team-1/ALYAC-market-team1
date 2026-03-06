import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CreateProductInput, ProductResponse } from '../types';

export const createProduct = async (data: CreateProductInput) => {
  const response = await axiosInstance.post<ProductResponse>(API_ENDPOINT.PRODUCT_CREATE, {
    product: data,
  });
  console.log('createProduct response:', JSON.stringify(response.data, null, 2));
  return response;
};
