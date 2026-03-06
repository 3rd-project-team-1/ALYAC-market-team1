import type { PostAuthor } from '@/entities/post/types';

export interface Product {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  authorId: string;
  createdAt: string;
  author: PostAuthor;
}

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

// TODO: product.schema.ts의 z.infer<>로 대체 예정, 차후 삭제
