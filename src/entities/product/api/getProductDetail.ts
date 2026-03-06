import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { productResponseSchema } from '../model/product.schema';

export const getProductDetail = async (productId: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.PRODUCT_DETAIL(productId));

  const result = productResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('상품 상세 조회 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
