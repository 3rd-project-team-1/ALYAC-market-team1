import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type ProductFormInput, productFormSchema } from '../model/product-from.schema';

interface EditableProduct {
  itemName: string;
  price: number;
  link: string;
}

export function useProductFormState(product?: EditableProduct) {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: {
      productName: product?.itemName ?? '',
      price: product?.price?.toString() ?? '',
      link: product?.link ?? '',
    },
  });

  useEffect(() => {
    if (!product) {
      return;
    }

    form.reset({
      productName: product.itemName,
      price: product.price.toString(),
      link: product.link,
    });
  }, [product, form]);

  return {
    form,
  };
}
