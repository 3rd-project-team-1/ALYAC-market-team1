import { createProduct } from './createProduct';
import { deleteProduct } from './deleteProduct';
import { getProductDetail } from './getProductDetail';
import { getUserProducts } from './getUserProducts';
import { updateProduct } from './updateProduct';

export const productApi = {
  getUserProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};

export { getUserProducts, getProductDetail, createProduct, updateProduct, deleteProduct };
