import { z } from 'zod';

export const productFormSchema = z.object({
  productName: z
    .string()
    .min(2, '상품명은 최소 2자 이상이어야 합니다.')
    .max(15, '상품명은 15자 이하여야 합니다.'),

  price: z
    .string()
    .min(1, '가격을 입력해주세요.')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: '가격은 1원 이상이어야 합니다.',
    }),

  link: z
    .string()
    .min(1, '판매 링크를 입력해주세요.')
    .regex(/^(https?:\/\/).*/, 'http:// 또는 https://로 시작해야 합니다.'),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
