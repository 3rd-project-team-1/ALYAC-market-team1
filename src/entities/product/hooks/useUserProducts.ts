import { useQuery } from '@tanstack/react-query';

import { getUserProducts } from '../api/getUserProducts';
import { productQueryKeys } from '../api/queryKeys';

export function useUserProducts(accountname?: string) {
  const { data: products = [] } = useQuery({
    queryKey: productQueryKeys.products(accountname),
    queryFn: () => getUserProducts(accountname!).then((res) => res.product),
    enabled: !!accountname,
  });

  return { products };
}
//여기도 마찬가지로 리턴을 원본 그대로.
