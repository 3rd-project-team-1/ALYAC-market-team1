import axiosInstance from '@/shared/api/axios';

import type { Product } from './types';

export interface ProductsResponse {
  count: number;
  product: Product[];
}

export interface ProductResponse {
  product: Product;
}

export interface CreateProductInput {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
}

export const productApi = {
  // 유저 상품 목록 GET /api/product/:accountname
  getUserProducts: (accountname: string) =>
    axiosInstance.get<ProductsResponse>(`/api/product/${accountname}`),

  // 상품 등록 POST /api/product
  createProduct: (data: CreateProductInput) =>
    axiosInstance.post<ProductResponse>('/api/product', { product: data }),

  // 상품 수정 PUT /api/product/:id
  updateProduct: (id: string, data: CreateProductInput) =>
    axiosInstance.put<ProductResponse>(`/api/product/${id}`, { product: data }),

  // 이미지 업로드 POST /api/image/uploadfile
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return axiosInstance.post<{ path: string }>('/api/image/uploadfile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
