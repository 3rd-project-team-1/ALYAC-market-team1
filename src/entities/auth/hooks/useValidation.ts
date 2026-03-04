import { useMutation } from '@tanstack/react-query';

import { checkAccountnameDuplicate, checkEmailDuplicate } from '@/entities/auth';

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
