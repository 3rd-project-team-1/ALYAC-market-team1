import { useQuery } from '@tanstack/react-query';

import { getUserProducts } from '../api/getUserProducts';

export function useUserProducts(accountname?: string) {
  const { data: products = [] } = useQuery({
    queryKey: ['products', accountname],
    queryFn: () => getUserProducts(accountname!).then((res) => res.product),
    enabled: !!accountname,
  });

  return { products };
}
