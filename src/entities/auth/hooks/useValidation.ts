import { useMutation } from '@tanstack/react-query';

import { checkAccountnameDuplicate, checkEmailDuplicate } from '@/entities/auth/api/validate';

export const useCheckEmailDuplicate = () => {
  return useMutation({
    mutationFn: checkEmailDuplicate,
  });
};

export const useCheckAccountnameDuplicate = () => {
  return useMutation({
    mutationFn: checkAccountnameDuplicate,
  });
};
