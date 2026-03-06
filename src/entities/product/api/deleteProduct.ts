import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(API_ENDPOINT.PRODUCT_DELETE(id));
  return response.data;
};
