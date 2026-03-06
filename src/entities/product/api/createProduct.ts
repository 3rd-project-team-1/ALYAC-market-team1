import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { type CreateProductInput, productResponseSchema } from '../model/product.schema';

export const createProduct = async (data: CreateProductInput) => {
  const response = await axiosInstance.post(API_ENDPOINT.PRODUCT_CREATE, { product: data });

  const result = productResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('상품등록 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
