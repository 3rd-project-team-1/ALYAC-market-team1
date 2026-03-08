import { API_ENDPOINT, api } from '@/shared/api';

import { type ValidationResponse, validationResponseSchema } from '../model/auth.schema';

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response: ValidationResponse = await api.post(
    API_ENDPOINT.AUTH_EMAIL_VALID,
    { user: { email } },
    validationResponseSchema,
  );
  return !response.ok;
};

export const checkAccountnameDuplicate = async (accountname: string): Promise<boolean> => {
  const response: ValidationResponse = await api.post(
    API_ENDPOINT.AUTH_ACCOUNTNAME_VALID,
    { user: { accountname } },
    validationResponseSchema,
  );
  return !response.ok;
};
