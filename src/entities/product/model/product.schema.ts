// product.schema.ts
import { z } from 'zod';

export const productAuthorSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: z.string(),
  intro: z.string(),
  image: z.string(),
  isfollow: z.boolean(),
  following: z.array(z.string()),
  follower: z.array(z.string()),
  followerCount: z.number(),
  followingCount: z.number(),
});

export const productSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  price: z.number(),
  link: z.string(),
  itemImage: z.string(),
  author: productAuthorSchema,
});

export const productResponseSchema = z.object({
  product: productSchema,
});

export const productsResponseSchema = z.object({
  product: z.array(productSchema),
});

export const createProductInputSchema = z.object({
  itemName: z.string(),
  price: z.number(),
  link: z.string(),
  itemImage: z.string(),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export type ProductAuthor = z.infer<typeof productAuthorSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
