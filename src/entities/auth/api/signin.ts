import { API_ENDPOINT, api } from '@/shared/api';

import { type SigninResponse, signinResponseSchema } from '../model/auth.schema';

export const signIn = (data: unknown): Promise<SigninResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNIN, data, signinResponseSchema);
