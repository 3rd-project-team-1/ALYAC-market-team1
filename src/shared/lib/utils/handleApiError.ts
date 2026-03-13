import axios from 'axios';
import { toast } from 'sonner';

import { ApiErrorResponse } from '@/entities/user';

export function handleApiError(error: unknown, defaultMessage = '오류가 발생했습니다.') {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(defaultMessage);
  }
}
