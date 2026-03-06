import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { productsResponseSchema } from '../model/product.schema';

export const getUserProducts = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.PRODUCT_GET_USER(accountname));
  const result = productsResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('게시글 조회 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }
  return result.data;
};
