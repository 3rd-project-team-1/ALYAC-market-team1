import { useQuery } from '@tanstack/react-query';

import { productApi } from '@/entities/product/api';

export function useUserProducts(accountname?: string) {
  const { data: products = [] } = useQuery({
    queryKey: ['products', accountname],
    queryFn: () => productApi.getUserProducts(accountname!).then((res) => res.data.product),
    enabled: !!accountname,
  });

  return { products };
}
