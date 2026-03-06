import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import type { ProductsResponse } from '../types';

export const getUserProducts = async (accountname: string) => {
  const response = await axiosInstance.get<ProductsResponse>(
    API_ENDPOINT.PRODUCT_GET_USER(accountname),
  );

  return response;
};
