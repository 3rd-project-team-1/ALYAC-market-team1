export const productQueryKeys = {
  product: (productId: string | undefined) => ['product', productId] as const,
  products: (accountname?: string | null) => ['products', accountname] as const,
};
