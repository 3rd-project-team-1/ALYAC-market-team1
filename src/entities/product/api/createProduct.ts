import { API_ENDPOINT, api } from '@/shared/api';

import {
  type ProductRequest,
  type ProductResponse,
  productResponseSchema,
} from '../model/product.schema';

/**
 * 상품 등록 API
 * @param data - 상품 정보 (itemName, price, link, itemImage)
 * @returns 등록된 상품 정보
 * @example
 * ```ts
 * const { product } = await createProduct({
 *   itemName: '맥북 프로',
 *   price: 2500000,
 *   link: 'https://example.com/product',
 *   itemImage: 'https://example.com/image.jpg',
 * });
 * ```
 */
export const createProduct = (data: ProductRequest): Promise<ProductResponse> =>
  api.post(API_ENDPOINT.PRODUCT_CREATE, { product: data }, productResponseSchema);
