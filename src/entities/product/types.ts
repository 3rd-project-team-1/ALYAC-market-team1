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
