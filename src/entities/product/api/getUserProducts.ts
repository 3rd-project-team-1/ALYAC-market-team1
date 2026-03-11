import { API_ENDPOINT, api } from '@/shared/api';

import { type ProductsResponse, productsResponseSchema } from '../model/product.schema';

/**
 * 특정 사용자의 상품 목록 조회 API
 * @param accountname - 사용자 계정 ID
 * @returns 사용자의 상품 목록
 * @example
 * ```ts
 * const { product } = await getUserProducts('hong123');
 * ```
 */
export const getUserProducts = (accountname: string): Promise<ProductsResponse> =>
  api.get(API_ENDPOINT.PRODUCT_GET_USER(accountname), productsResponseSchema);
