import { createProduct } from './api/createProduct';
import { getUserProducts } from './api/getUserProducts';
import { updateProduct } from './api/updateProduct';

// 하위 호환을 위한 productApi 객체 (기존 코드가 사용 중)
export const productApi = {
  getUserProducts,
  createProduct,
  updateProduct,
};

// 개별 API 함수 exports
export { getUserProducts } from './api/getUserProducts';
export { createProduct } from './api/createProduct';
export { updateProduct } from './api/updateProduct';

export type {
  Product,
  ProductsResponse,
  ProductResponse,
  CreateProductInput,
} from './types';

export { useUserProducts } from './hooks/useUserProducts';
