import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../api/getProductDetail';
import { productQueryKeys } from '../model/queryKeys';

export function useProductDetail(productId?: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: productQueryKeys.product(productId),
    queryFn: () => getProductDetail(productId!).then((res) => res.product),
    enabled: !!productId,
  });

  return {
    product: data,
    isLoading,
    isError,
  };
}
// 리턴을 응답 온 그대로 보내는게 좋아보임!
