import { createProduct } from './createProduct';
import { getUserProducts } from './getUserProducts';
import { updateProduct } from './updateProduct';

export const productApi = {
  getUserProducts,
  createProduct,
  updateProduct,
};

export { getUserProducts, createProduct, updateProduct };
