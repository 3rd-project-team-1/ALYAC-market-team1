import { API_ENDPOINT, api } from '@/shared/api';

import {
  type ProductRequest,
  type ProductResponse,
  productResponseSchema,
} from '../model/product.schema';

/**
 * 상품 수정 API
 * @param id - 수정할 상품 ID
 * @param data - 수정할 상품 정보 (itemName, price, link, itemImage)
 * @returns 수정된 상품 정보
 * @example
 * ```ts
 * const { product } = await updateProduct('product123', {
 *   itemName: '맥북 에어',
 *   price: 1500000,
 *   link: 'https://example.com/updated',
 *   itemImage: 'https://example.com/new.jpg',
 * });
 * ```
 */
export const updateProduct = (id: string, data: ProductRequest): Promise<ProductResponse> =>
  api.put(API_ENDPOINT.PRODUCT_UPDATE(id), { product: data }, productResponseSchema);
