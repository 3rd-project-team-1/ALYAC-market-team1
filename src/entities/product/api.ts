import axiosInstance from '@/shared/api/axios';

import type { Product } from './types';

export interface ProductsResponse {
  count: number;
  product: Product[];
}

export const productApi = {
  // 유저 상품 목록 GET /api/product/:accountname
  getUserProducts: (accountname: string) =>
    axiosInstance.get<ProductsResponse>(`/api/product/${accountname}`),
};
