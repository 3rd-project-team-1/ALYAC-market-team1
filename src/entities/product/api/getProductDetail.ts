import { API_ENDPOINT, api } from '@/shared/api';

import { type ProductResponse, productResponseSchema } from '../model/product.schema';

export const getProductDetail = (productId: string): Promise<ProductResponse> =>
  api.get(API_ENDPOINT.PRODUCT_DETAIL(productId), productResponseSchema);
