import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { CreateProductInput } from '../types';

export const updateProduct = async (id: string, data: CreateProductInput) => {
  const response = await axiosInstance.put(API_ENDPOINT.PRODUCT_UPDATE(id), { product: data });
  console.log('updateProduct response:', JSON.stringify(response.data, null, 2));
  return response;
};
