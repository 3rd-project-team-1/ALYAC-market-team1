import { API_ENDPOINT, api } from '@/shared/api';

import {
  type ProductRequest,
  type ProductResponse,
  productResponseSchema,
} from '../model/product.schema';

export const updateProduct = (id: string, data: ProductRequest): Promise<ProductResponse> =>
  api.put(API_ENDPOINT.PRODUCT_UPDATE(id), { product: data }, productResponseSchema);
