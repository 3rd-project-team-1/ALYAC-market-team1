import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '../api/deleteProduct';
import { productQueryKeys } from '../model/queryKeys';

export function useDeleteProduct(accountname: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.products(accountname) });
    },
  });
}
