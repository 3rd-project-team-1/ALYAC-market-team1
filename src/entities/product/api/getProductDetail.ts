import { API_ENDPOINT, api } from '@/shared/api';

import { type ProductResponse, productResponseSchema } from '../model/product.schema';

/**
 * 상품 상세 조회 API
 * @param productId - 조회할 상품 ID
 * @returns 상품 상세 정보
 * @example
 * ```ts
 * const { product } = await getProductDetail('product123');
 * ```
 */
export const getProductDetail = (productId: string): Promise<ProductResponse> =>
  api.get(API_ENDPOINT.PRODUCT_DETAIL(productId), productResponseSchema);
