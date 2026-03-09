import { API_ENDPOINT, api } from '@/shared/api';

import { type DeleteProductResponse, deleteProductResponseSchema } from '../model/product.schema';

/**
 * 상품 삭제 API
 * @param id - 삭제할 상품 ID
 * @returns 삭제 완료 메시지
 * @example
 * ```ts
 * const { message } = await deleteProduct('product123');
 * ```
 */
export const deleteProduct = (id: string): Promise<DeleteProductResponse> =>
  api.delete(API_ENDPOINT.PRODUCT_DELETE(id), deleteProductResponseSchema);
