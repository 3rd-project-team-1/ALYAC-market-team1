import { API_ENDPOINT, api } from '@/shared/api';

import { type ProductsResponse, productsResponseSchema } from '../model/product.schema';

export const getUserProducts = (accountname: string): Promise<ProductsResponse> =>
  api.get(API_ENDPOINT.PRODUCT_GET_USER(accountname), productsResponseSchema);
