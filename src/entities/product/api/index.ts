import { createProduct } from './createProduct';
import { deleteProduct } from './deleteProduct';
import { getUserProducts } from './getUserProducts';
import { updateProduct } from './updateProduct';

export const productApi = {
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export { getUserProducts, createProduct, updateProduct, deleteProduct };
