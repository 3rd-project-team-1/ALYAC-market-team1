import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../api/getProductDetail';

export function useProductDetail(productId?: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail(productId!).then((res) => res.product),
    enabled: !!productId,
  });

  return {
    product: data,
    isLoading,
    isError,
  };
}
