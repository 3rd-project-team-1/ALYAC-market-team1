import { useQuery } from '@tanstack/react-query';

import { getUserProducts } from '../api/getUserProducts';
import { productQueryKeys } from '../model/queryKeys';

export function useUserProducts(accountname?: string) {
  return useQuery({
    queryKey: productQueryKeys.products(accountname),
    queryFn: () => getUserProducts(accountname!).then((res) => res.product),
    enabled: !!accountname,
  });
}
