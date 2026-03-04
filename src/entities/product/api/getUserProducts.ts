import axiosInstance from '@/shared/api/axios';

import type { ProductsResponse } from '../types';

export const getUserProducts = (accountname: string) =>
  axiosInstance.get<ProductsResponse>(`/api/product/${accountname}`);
