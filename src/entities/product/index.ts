export {
  productApi,
  getUserProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api';

export type { Product, ProductsResponse, ProductResponse, CreateProductInput } from './types';

export { useUserProducts } from './hooks/useUserProducts';
export { useProductDetail } from './hooks/useProductDetail';
export { useUpdateProduct } from './hooks/useUpdateProduct';
export { useCreateProduct } from './hooks/useCreateProduct';
export { useDeleteProduct } from './hooks/useDeleteProduct';
