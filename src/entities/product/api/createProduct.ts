import { API_ENDPOINT, api } from '@/shared/api';

import {
  type ProductRequest,
  type ProductResponse,
  productResponseSchema,
} from '../model/product.schema';

export const createProduct = (data: ProductRequest): Promise<ProductResponse> =>
  api.post(API_ENDPOINT.PRODUCT_CREATE, { product: data }, productResponseSchema);
