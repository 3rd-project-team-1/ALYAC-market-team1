import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { type CreateProductInput, productResponseSchema } from '../model/product.schema';

export const updateProduct = async (id: string, data: CreateProductInput) => {
  const response = await axiosInstance.put(API_ENDPOINT.PRODUCT_UPDATE(id), { product: data });

  const result = productResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('상품 수정 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
