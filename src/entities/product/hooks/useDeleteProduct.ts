import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteProduct } from '../api/deleteProduct';

export function useDeleteProduct(accountname: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success('상품이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['products', accountname] });
    },
    onError: () => {
      toast.error('상품 삭제에 실패했습니다.');
    },
  });
}
