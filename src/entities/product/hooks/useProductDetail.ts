import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../api/getProductDetail';
import { productQueryKeys } from '../model/queryKeys';

export function useProductDetail(productId?: string) {
  return useQuery({
    queryKey: productQueryKeys.product(productId),
    queryFn: () => getProductDetail(productId!).then((res) => res.product),
    enabled: !!productId,
  });
}
