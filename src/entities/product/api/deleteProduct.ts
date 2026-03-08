import { API_ENDPOINT, api } from '@/shared/api';

import { type DeleteProductResponse, deleteProductResponseSchema } from '../model/product.schema';

export const deleteProduct = (id: string): Promise<DeleteProductResponse> =>
  api.delete(API_ENDPOINT.PRODUCT_DELETE(id), deleteProductResponseSchema);
